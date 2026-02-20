package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.PreferenceDTO;

public interface PreferenceService {
    PreferenceDTO getPreferences(Long userId);
    PreferenceDTO updatePreferences(Long userId, PreferenceDTO dto);
}

