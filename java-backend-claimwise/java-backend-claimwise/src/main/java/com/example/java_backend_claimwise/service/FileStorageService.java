package com.example.java_backend_claimwise.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private S3Client s3Client;

    @Value("${aws.bucket.name}")
    private String bucket;

    public String uploadFile(MultipartFile file) {
        try {
            String key = UUID.randomUUID() + "-" + file.getOriginalFilename();

            s3Client.putObject(PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .contentType(file.getContentType())
                    .build(), RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            return "https://" + bucket + ".s3.amazonaws.com/" + key;
        } catch (IOException e) {
            throw new RuntimeException("File upload failed" + e.getMessage());
        }


    }
}
