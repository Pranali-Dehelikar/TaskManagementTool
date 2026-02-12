package com.TaskManagementTool.Service;

import com.TaskManagementTool.DTO.UserRequest;
import com.TaskManagementTool.Entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User createUser(UserRequest request);

    List<User> getAllUsers();

    Optional<User> findByEmail(String email);   // ✅ Optional

    User save(User user);
}
