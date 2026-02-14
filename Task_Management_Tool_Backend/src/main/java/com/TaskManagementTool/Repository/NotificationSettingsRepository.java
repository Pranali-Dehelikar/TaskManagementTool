package com.TaskManagementTool.Repository;

import com.TaskManagementTool.Entity.NotificationSettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NotificationSettingsRepository
        extends JpaRepository<NotificationSettings, Long> {

    Optional<NotificationSettings>
    findByUserIdAndNotificationType(Long userId, String notificationType);
}

