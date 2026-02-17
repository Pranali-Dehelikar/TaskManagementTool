package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.TaskReportDto;
import com.TaskManagementTool.Entity.Task;
import java.util.List;

public interface TaskService {

    Task createTask(Task task);

    List<Task> getAllTasks();

    List<Task> searchTasks(String keyword);

    List<TaskReportDto> getTaskReportData(String keyword);

    List<Task> getUserTasks(Long userId);

    Task checkTaskScore(Long taskId);

    Task updateTaskStatus(Long taskId, String status);



}
