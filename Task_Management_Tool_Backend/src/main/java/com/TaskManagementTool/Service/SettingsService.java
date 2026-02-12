package com.TaskManagementTool.Service;

import com.TaskManagementTool.Entity.User;
import com.TaskManagementTool.Entity.UserSettings;
import com.TaskManagementTool.Repository.UserRepository;
import com.TaskManagementTool.Repository.UserSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsService {

    private final UserRepository userRepository;
    private final UserSettingsRepository settingsRepository;

    public UserSettings getSettings(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return settingsRepository.findByUser(user)
                .orElseGet(() -> {
                    UserSettings settings = new UserSettings();
                    settings.setUser(user);
                    return settingsRepository.save(settings);
                });
    }

    public UserSettings updateSettings(Long userId, UserSettings updated) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserSettings settings = settingsRepository.findByUser(user)
                .orElseGet(() -> {
                    UserSettings s = new UserSettings();
                    s.setUser(user);
                    return s;
                });

        // Update fields (expand as needed)
        settings.setDarkMode(updated.getDarkMode());
        settings.setEmailNotifications(updated.getEmailNotifications());
        settings.setInAppNotifications(updated.getInAppNotifications());
        settings.setNotificationFrequency(updated.getNotificationFrequency());

        settings.setDefaultTaskStatus(updated.getDefaultTaskStatus());
        settings.setDefaultTaskView(updated.getDefaultTaskView());
        settings.setAutoArchiveCompleted(updated.getAutoArchiveCompleted());

        settings.setLanguage(updated.getLanguage());
        settings.setTimeZone(updated.getTimeZone());

        settings.setGoogleCalendarSync(updated.getGoogleCalendarSync());
        settings.setEmailIntegration(updated.getEmailIntegration());

        return settingsRepository.save(settings);
    }

    // Fetch profile information
    public User getProfile(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
