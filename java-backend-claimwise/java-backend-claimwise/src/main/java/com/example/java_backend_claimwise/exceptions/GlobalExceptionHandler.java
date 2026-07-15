package com.example.java_backend_claimwise.exceptions;

import com.example.java_backend_claimwise.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<?>> handleRuntime(RuntimeException ex) {
        return ResponseEntity.badRequest().body(ApiResponse.failure(ex.getMessage()));
    }

    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> emailNotFoundException(EmailNotFoundException ex){
        return ResponseEntity.badRequest().body(ApiResponse.failure(ex.getMessage()));
    }

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<?>> appException(AppException ex){
        return ResponseEntity.badRequest().body(ApiResponse.failure(ex.getMessage()));
    }

    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<ApiResponse<?>> invalidOtpException(InvalidOtpException ex){
        return ResponseEntity.badRequest().body(ApiResponse.failure(ex.getMessage()));
    }
}
