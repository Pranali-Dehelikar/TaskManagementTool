package com.TaskManagementTool.Controller;

import com.TaskManagementTool.Entity.Task;
import com.TaskManagementTool.Service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService service;

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return service.createTask(task);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return service.getAllTasks();
    }

    @GetMapping("/search")
    public List<Task> search(@RequestParam String keyword) {
        return service.searchTasks(keyword);
    }
}
