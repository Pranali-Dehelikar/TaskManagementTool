package com.TaskManagementTool.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskReportDto {
    private String title;
    private String description;
    private String status;
}
