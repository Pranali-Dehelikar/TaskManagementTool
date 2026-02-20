package com.TaskManagementTool.Repository;

import com.TaskManagementTool.Entity.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferenceRepository extends JpaRepository<UserPreference, Long> {
    UserPreference findByUserId(Long userId);
}

