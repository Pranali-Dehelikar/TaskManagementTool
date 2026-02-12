package com.TaskManagementTool.Service;

import com.TaskManagementTool.Entity.Task;
import java.util.List;

public interface TaskService {
    Task createTask(Task task);
    List<Task> getAllTasks();
    List<Task> searchTasks(String keyword);
}
