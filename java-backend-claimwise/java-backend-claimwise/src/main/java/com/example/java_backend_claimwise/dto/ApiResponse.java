package com.example.java_backend_claimwise.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {
    private String message;
    private boolean success;
    private T data;

    public static <T> ApiResponse<T> success(String message,T data) {
        return ApiResponse.<T>builder()
                .message(message)
                .data(data)
                .success(true)
                .build();
    }

    public static <T> ApiResponse<T> success(String message){
        return ApiResponse.<T>builder()
                .message(message)
                .success(true)
                .build();
    }
    public static <T> ApiResponse<T> failure(String message){
        return ApiResponse.<T>builder()
                .message(message)
                .success(false)
                .data(null)
                .build();
    }
}
