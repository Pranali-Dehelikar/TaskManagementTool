package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.TaskReportDto;
import com.TaskManagementTool.Entity.Notification;
import com.TaskManagementTool.Entity.Task;
import com.TaskManagementTool.Entity.NotificationSettings;
import com.TaskManagementTool.Repository.NotificationRepository;
import com.TaskManagementTool.Repository.TaskRepository;
import com.TaskManagementTool.Repository.NotificationSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository repo;

    @Autowired
    private NotificationSettingsRepository settingsRepo;

    @Autowired
    private NotificationRepository notificationRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private GoogleSheetService googleSheetService;

    @Override
    public Task createTask(Task task) {

        // Default values
        task.setStatus("PENDING");
        task.setScore(null);

        Task savedTask = repo.save(task);

        Long userId = savedTask.getAssignedUserId();

        Optional<NotificationSettings> optionalSettings =
                settingsRepo.findByUserIdAndNotificationType(userId, "Task");

        if (optionalSettings.isPresent()) {

            NotificationSettings settings = optionalSettings.get();
            String message = "New Task Assigned: " + savedTask.getTitle();

            if (settings.isInAppEnabled()) {
                Notification notification = new Notification();
                notification.setUserId(userId);
                notification.setMessage(message);
                notification.setCreatedAt(LocalDateTime.now());
                notification.setIsRead(false);

                notificationRepo.save(notification);
            }

            if (settings.isEmailEnabled()) {
                emailService.sendEmail(
                        "franklinsurya4@gmail.com",
                        "Task Assigned",
                        message
                );
            }
        }

        return savedTask;
    }

    @Override
    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    @Override
    public List<Task> searchTasks(String keyword) {
        return repo.findByTitleContainingIgnoreCase(keyword);
    }

    @Override
    public List<TaskReportDto> getTaskReportData(String keyword) {

        List<Task> tasks =
                (keyword == null || keyword.isBlank())
                        ? repo.findAll()
                        : repo.findByTitleContainingIgnoreCase(keyword);

        return tasks.stream()
                .map(t -> new TaskReportDto(
                        t.getTitle(),
                        t.getDescription(),
                        t.getStatus()
                ))
                .toList();
    }

    @Override
    public List<Task> getUserTasks(Long userId) {
        return repo.findByAssignedUserId(userId);
    }

    @Override
    public Task checkTaskScore(Long taskId) {

        Task task = repo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        int score = googleSheetService.fetchScoreFromGoogleForm(task.getGoogleFormUrl());

        task.setScore(score);

        if (score >= 5) {
            task.setStatus("DONE");
        } else {
            task.setStatus("PENDING");
        }

        return repo.save(task);
    }

    @Override
    public Task updateTaskStatus(Long taskId, String status) {

        Task task = repo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);

        return repo.save(task);
    }

}
