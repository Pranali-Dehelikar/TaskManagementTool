package com.TaskManagementTool.Controller;

import com.TaskManagementTool.Entity.GoogleFormTask;
import com.TaskManagementTool.Entity.Task;
import com.TaskManagementTool.Repository.TaskRepository;
import com.TaskManagementTool.Service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService service;

    private final TaskRepository taskRepository;

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return service.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return service.getAllTasks();
    }

    @GetMapping("/user/{userId}")
    public List<Task> getUserTasks(@PathVariable Long userId) {
        return service.getUserTasks(userId);
    }

    @GetMapping("/search")
    public List<Task> search(@RequestParam String keyword) {
        return service.searchTasks(keyword);
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<Task>> getTasksByDate(
            @RequestParam("date") String date) {

        LocalDate selectedDate = LocalDate.parse(date);
        List<Task> tasks = taskRepository.findByDueDate(selectedDate);

        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/{id}/check")
    public Task checkTaskScore(@PathVariable Long id) {
        return service.checkTaskScore(id);
    }

    @PatchMapping("/{id}/status")
    public Task updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return service.updateTaskStatus(id, status);
    }

}
