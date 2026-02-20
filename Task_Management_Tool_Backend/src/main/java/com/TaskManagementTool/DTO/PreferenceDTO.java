package com.TaskManagementTool.DTO;

import lombok.Data;

import java.util.List;

@Data
public class PreferenceDTO {

    private String theme;
    private String language;
    private Boolean emailNotifications;
    private String defaultTaskFilter;
    private List<Long> favouriteTaskIds;
}

