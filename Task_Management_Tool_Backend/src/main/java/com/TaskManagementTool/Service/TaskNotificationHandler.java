package com.TaskManagementTool.Service;

import com.TaskManagementTool.Entity.NotificationSettings;
import com.TaskManagementTool.Repository.NotificationSettingsRepository;
import com.TaskManagementTool.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TaskNotificationHandler {

    private final NotificationSettingsRepository settingsRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;

    public void notifyUser(Long userId, String notificationType, String taskDetails) {

        Optional<NotificationSettings> optionalSettings =
                settingsRepository.findByUserIdAndNotificationType(userId, notificationType);

        if (optionalSettings.isEmpty()) {
            return; // no settings configured
        }

        NotificationSettings settings = optionalSettings.get();

        if (settings.isEmailEnabled()) {

            userRepository.findById(userId)
                    .map(user -> user.getEmail())
                    .ifPresent(userEmail ->
                            emailService.sendEmail(
                                    userEmail,
                                    "Task Notification: " + notificationType,
                                    "Details: " + taskDetails
                            )
                    );
        }
    }
}
