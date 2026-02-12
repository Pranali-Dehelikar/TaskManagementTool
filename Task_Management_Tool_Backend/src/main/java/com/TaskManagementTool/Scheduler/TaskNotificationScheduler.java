package com.TaskManagementTool.Scheduler;

import com.TaskManagementTool.Entity.TaskStatus;
import com.TaskManagementTool.Repository.TaskRepository;
import com.TaskManagementTool.Service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@EnableScheduling
@RequiredArgsConstructor
public class TaskNotificationScheduler {

  
}

