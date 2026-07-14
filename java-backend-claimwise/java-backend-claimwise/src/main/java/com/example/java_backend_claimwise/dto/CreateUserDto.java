package com.example.java_backend_claimwise.dto;

import com.example.java_backend_claimwise.constants.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {

    private String email;
    private String name;
    private Role role;
}
