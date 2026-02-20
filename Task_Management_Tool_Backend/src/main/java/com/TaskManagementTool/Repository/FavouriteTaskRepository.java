package com.TaskManagementTool.Repository;

import com.TaskManagementTool.Entity.FavouriteTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavouriteTaskRepository extends JpaRepository<FavouriteTask, Long> {
    List<FavouriteTask> findByUserId(Long userId);
    void deleteByUserIdAndTaskId(Long userId, Long taskId);
}

