package com.TaskManagementTool.Controller;

import com.TaskManagementTool.DTO.TaskReportDto;
import com.TaskManagementTool.Entity.Task;
import com.TaskManagementTool.Service.TaskService;
import com.TaskManagementTool.Service.TaskServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService service;

    private TaskServiceImpl taskimpl;

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
    /* @GetMapping("/report")
    public List<TaskReportDto> getReport(
            @RequestParam(required = false) String keyword
    ) {
        return taskimpl.getTaskReportData(keyword);
    } */

}

