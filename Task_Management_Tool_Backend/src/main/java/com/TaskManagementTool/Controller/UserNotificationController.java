package com.TaskManagementTool.Controller;

import com.TaskManagementTool.Entity.UserNotification;
import com.TaskManagementTool.Service.UserNotificationService;
import com.TaskManagementTool.Service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class UserNotificationController {

    private final UserNotificationService service;

    @GetMapping("/{userId}")
    public List<UserNotification> getNotifications(@PathVariable Long userId) {
        return service.getUserNotifications(userId);
    }

    @PostMapping("/{userId}")
    public void saveNotifications(@PathVariable Long userId, @RequestBody List<UserNotification> notifications) {
        service.saveUserNotifications(notifications, userId);
    }
}
