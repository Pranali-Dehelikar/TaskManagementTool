package com.TaskManagementTool.DTO;

import com.TaskManagementTool.Entity.TaskStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    private String title;
    private String description;
    private LocalDate dueDate;
    private TaskStatus status;
    private Long userId;
}

