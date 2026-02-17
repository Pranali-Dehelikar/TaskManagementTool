package com.TaskManagementTool.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private String status; // PENDING / PROCESS / DONE

    private String googleFormUrl;

    private Integer score;

    private Long assignedUserId;

    private LocalDate dueDate;

    private String imageUrl;
}
