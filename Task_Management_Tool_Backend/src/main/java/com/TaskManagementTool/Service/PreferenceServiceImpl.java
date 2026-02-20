package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.PreferenceDTO;
import com.TaskManagementTool.Entity.FavouriteTask;
import com.TaskManagementTool.Entity.UserPreference;
import com.TaskManagementTool.Repository.FavouriteTaskRepository;
import com.TaskManagementTool.Repository.PreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreferenceServiceImpl implements PreferenceService {

    @Autowired
    PreferenceRepository preferenceRepo;

    @Autowired
    FavouriteTaskRepository favRepo;

    @Override
    public PreferenceDTO getPreferences(Long userId) {

        UserPreference pref = preferenceRepo.findByUserId(userId);
        List<FavouriteTask> favTasks = favRepo.findByUserId(userId);

        PreferenceDTO dto = new PreferenceDTO();
        dto.setTheme(pref.getTheme());
        dto.setLanguage(pref.getLanguage());
        dto.setEmailNotifications(pref.getEmailNotifications());
        dto.setDefaultTaskFilter(pref.getDefaultTaskFilter());

        dto.setFavouriteTaskIds(
                favTasks.stream().map(FavouriteTask::getTaskId).toList()
        );

        return dto;
    }

    @Override
    public PreferenceDTO updatePreferences(Long userId, PreferenceDTO dto) {

        UserPreference pref = preferenceRepo.findByUserId(userId);

        pref.setTheme(dto.getTheme());
        pref.setLanguage(dto.getLanguage());
        pref.setEmailNotifications(dto.getEmailNotifications());
        pref.setDefaultTaskFilter(dto.getDefaultTaskFilter());

        preferenceRepo.save(pref);

        favRepo.deleteAll(favRepo.findByUserId(userId));

        for(Long taskId : dto.getFavouriteTaskIds()) {
            FavouriteTask fav = new FavouriteTask();
            fav.setUserId(userId);
            fav.setTaskId(taskId);
            favRepo.save(fav);
        }

        return dto;
    }
}

