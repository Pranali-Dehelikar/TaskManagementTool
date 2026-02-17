package com.TaskManagementTool.Repository;

import com.TaskManagementTool.Entity.GoogleFormTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoogleFormTaskRepository extends JpaRepository<GoogleFormTask, Long> {
}

