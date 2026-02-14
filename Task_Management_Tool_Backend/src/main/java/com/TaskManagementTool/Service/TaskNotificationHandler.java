package com.TaskManagementTool.Service;

import com.TaskManagementTool.Entity.UserNotification;
import com.TaskManagementTool.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TaskNotificationHandler {

    private final UserNotificationService notificationService;
    private final EmailService emailService;
    private final UserRepository userRepository; // your existing User repo

    public void notifyUser(Long userId, String notificationType, String taskDetails) {

        List<UserNotification> settings = notificationService.getUserNotifications(userId);

        settings.stream()
                .filter(n -> n.getNotificationType().equals(notificationType))
                .findFirst()
                .ifPresent(n -> {
                    if (Boolean.TRUE.equals(n.getEmailEnabled())) {
                        String userEmail = userRepository.findById(userId)
                                .map(u -> u.getEmail())
                                .orElse(null);
                        if(userEmail != null) {
                            emailService.sendEmail(
                                    userEmail,
                                    "Task Notification: " + notificationType,
                                    "Details: " + taskDetails
                            );
                        }
                    }
                    // TODO: push/in-app notifications
                });
    }
}
