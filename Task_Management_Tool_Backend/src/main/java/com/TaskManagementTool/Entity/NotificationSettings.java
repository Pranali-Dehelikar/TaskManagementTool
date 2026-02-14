package com.TaskManagementTool.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class NotificationSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String notificationType;

    private boolean emailEnabled;
    private boolean inAppEnabled;

    // getters & setters
}
