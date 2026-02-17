package com.TaskManagementTool.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class GoogleFormTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String formUrl;
    private String imageUrl;
    private String sheetId;

    private Integer score;
    private String status; // PENDING, DONE, RETRY

    // Getters and Setters
}

