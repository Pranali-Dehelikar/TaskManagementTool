package com.TaskManagementTool.DTO;

import lombok.Data;

@Data
public class UserRequest {
    private String name;
    private String email;
    private String password;
    private Boolean smsEnabled;
}
