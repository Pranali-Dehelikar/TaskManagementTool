package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.TaskReportDto;
import com.TaskManagementTool.Entity.Task;
import com.TaskManagementTool.Repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository repo;

    public Task createTask(Task task) {
        return repo.save(task);
    }

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public List<Task> searchTasks(String keyword) {
        return repo.findByTitleContainingIgnoreCase(keyword);
    }


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
}

