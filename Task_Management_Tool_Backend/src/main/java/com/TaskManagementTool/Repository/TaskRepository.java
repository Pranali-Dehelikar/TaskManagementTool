package com.TaskManagementTool.Repository;

import com.TaskManagementTool.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedUserId(Long userId);

    List<Task> findByTitleContainingIgnoreCase(String title);

    List<Task> findByDueDate(LocalDate dueDate);

}

