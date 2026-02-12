package com.TaskManagementTool.Controller;

import com.TaskManagementTool.Entity.User;
import com.TaskManagementTool.Entity.UserSettings;
import com.TaskManagementTool.Service.SettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SettingsController {

    private final SettingsService settingsService;

    // For demo, use fixed userId. Replace with JWT in production
    private Long getUserId() {
        return 1L;
    }

    @GetMapping
    public ResponseEntity<UserSettings> getSettings() {
        return ResponseEntity.ok(settingsService.getSettings(getUserId()));
    }

    @PutMapping
    public ResponseEntity<UserSettings> updateSettings(@RequestBody UserSettings updated) {
        return ResponseEntity.ok(settingsService.updateSettings(getUserId(), updated));
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile() {
        return ResponseEntity.ok(settingsService.getProfile(getUserId()));
    }
}
