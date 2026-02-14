package com.TaskManagementTool.Service;

import com.TaskManagementTool.Entity.UserNotification;
import com.TaskManagementTool.Repository.UserNotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserNotificationService {

    private final UserNotificationRepository repository;

    public List<UserNotification> getUserNotifications(Long userId) {
        return repository.findByUserId(userId);
    }

    public void saveUserNotifications(List<UserNotification> notifications, Long userId) {
        notifications.forEach(n -> n.setUserId(userId));
        repository.saveAll(notifications);
    }
}

