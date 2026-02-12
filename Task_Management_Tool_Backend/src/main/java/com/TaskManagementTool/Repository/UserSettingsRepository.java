package com.TaskManagementTool.Repository;

import com.TaskManagementTool.Entity.User;
import com.TaskManagementTool.Entity.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserSettingsRepository extends JpaRepository<UserSettings, Long> {
    Optional<UserSettings> findByUser(User user);
}
