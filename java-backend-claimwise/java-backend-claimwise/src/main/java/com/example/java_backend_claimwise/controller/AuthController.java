package com.example.java_backend_claimwise.controller;

import com.example.java_backend_claimwise.dto.*;
import com.example.java_backend_claimwise.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/request-otp")
    public ApiResponse<String> requestOtp(@Valid @RequestBody RequestOtpDto dto){
       authService.requestOtp(dto.getEmail());
       return ApiResponse.success("Otp send to your email");
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<AuthResponse>> verifyOtp(@Valid @RequestBody VerifyOtpDto dto){
        return ResponseEntity.ok(ApiResponse.success("Otp Verified successfully",authService.verifyOtp(dto.getEmail(),dto.getCode())));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(@Valid @RequestBody RefreshDto dto){
        return ResponseEntity.ok(ApiResponse.success("Refresh Token fetched Successfully",authService.refresh(dto)));
    }
//
//    @GetMapping("/me")
//    public ResponseEntity<ApiResponse<CreateUserDto>> getUser(@AuthenticationPrincipal Long userId){
//        return ResponseEntity.ok(ApiResponse.success("User fetched successfully",authService.getUser(userId)));
//    }
}

