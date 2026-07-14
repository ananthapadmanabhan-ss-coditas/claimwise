package com.example.java_backend_claimwise.controller;

import com.example.java_backend_claimwise.dto.ApiResponse;
import com.example.java_backend_claimwise.dto.CreateUserDto;
import com.example.java_backend_claimwise.entity.Users;
import com.example.java_backend_claimwise.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Account management, restricted to Admins")
public class AdminController {
    private final AuthService authService;

    @PostMapping
    public ApiResponse<Users> createUser(@RequestBody @Valid CreateUserDto dto) {
        return ApiResponse.success("Successfully send the welcome email",authService.createUser(dto));
    }
}


