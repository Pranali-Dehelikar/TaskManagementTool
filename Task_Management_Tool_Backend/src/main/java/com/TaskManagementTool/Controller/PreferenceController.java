package com.TaskManagementTool.Controller;

import com.TaskManagementTool.DTO.PreferenceDTO;
import com.TaskManagementTool.Service.PreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/preferences")
public class PreferenceController {

    @Autowired
    PreferenceService service;

    @GetMapping("/{userId}")
    public PreferenceDTO getPref(@PathVariable Long userId){
        return service.getPreferences(userId);
    }

    @PutMapping("/{userId}")
    public PreferenceDTO updatePref(
            @PathVariable Long userId,
            @RequestBody PreferenceDTO dto){
        return service.updatePreferences(userId,dto);
    }
}

