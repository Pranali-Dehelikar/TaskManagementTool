package com.TaskManagementTool.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to user
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Appearance
    private Boolean darkMode = false;

    // Notifications
    private Boolean emailNotifications = true;
    private Boolean inAppNotifications = true;
    private String notificationFrequency = "IMMEDIATE";

    // Task Preferences
    private String defaultTaskStatus = "TODO";
    private String defaultTaskView = "LIST";
    private Boolean autoArchiveCompleted = false;

    // Privacy & Security
    private Boolean twoFactorEnabled = false;
    private Boolean smsEnabled = false; // Already in User, can sync
    private Boolean dataExportAllowed = true;

    // System
    private String language = "EN";
    private String timeZone = "UTC";

    // Integrations (just example fields)
    private Boolean googleCalendarSync = false;
    private Boolean emailIntegration = false;
}
