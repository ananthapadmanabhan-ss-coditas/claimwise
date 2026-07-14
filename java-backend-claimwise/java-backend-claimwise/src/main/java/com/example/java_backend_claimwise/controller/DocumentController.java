package com.example.java_backend_claimwise.controller;

import com.example.java_backend_claimwise.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/docs")
public class DocumentController {
    private final FileStorageService fileStorageService;

    @PostMapping("/upload")
    public Map<String ,String> upload(@RequestParam MultipartFile file){
        String url = fileStorageService.uploadFile(file);
        return Map.of("url",url);
    }

}
