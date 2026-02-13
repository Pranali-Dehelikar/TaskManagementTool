package com.TaskManagementTool.Controller;

import com.TaskManagementTool.Service.JwtService;
import com.TaskManagementTool.DTO.*;
import com.TaskManagementTool.Entity.User;
import com.TaskManagementTool.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtUtil;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody UserRequest request) {
        return userService.createUser(request);
    }

    // LOGIN
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        User user = userService.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token);
    }

    // GET PROFILE
    @GetMapping("/profile")
    public ProfileDTO getProfile(@RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractUsername(token);

        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new ProfileDTO(user.getName(), user.getEmail());
    }

    // CHANGE PASSWORD
    @PostMapping("/change-password")
    public String changePassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ChangePasswordRequest request
    ) {

        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractUsername(token);

        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userService.save(user);

        return "Password updated successfully";
    }
}
