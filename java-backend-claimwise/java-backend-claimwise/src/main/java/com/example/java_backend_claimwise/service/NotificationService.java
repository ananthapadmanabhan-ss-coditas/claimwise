package com.example.java_backend_claimwise.service;

import com.example.java_backend_claimwise.dto.CreateNotificationDto;
import com.example.java_backend_claimwise.entity.Notification;
import com.example.java_backend_claimwise.entity.Users;
import com.example.java_backend_claimwise.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepo;
    private final JavaMailSender mailSender;
    private final SimpMessagingTemplate messagingTemplate;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public Notification create(CreateNotificationDto dto) {
        Users user = new Users();
        user.setId(dto.getUserId());

        Notification notification = Notification.builder()
                .user(user)
                .title(dto.getTitle())
                .descriptions(dto.getMessage())
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepo.save(notification);

        sendEmail(dto.getEmail(), dto.getTitle(), dto.getMessage());
        pushLive(dto.getUserId(), notification);

        return notification;
    }

    private void sendEmail(String email, String subject, String body) {
        if (email == null || email.isBlank()) return;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    private void pushLive(Long userId, Notification notification) {
        messagingTemplate.convertAndSend("/topic/notifications/" + userId, notification);
    }

    public List<Notification> getMyNotifications(Long userId) {
        return notificationRepo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Notification> getUnread(Long userId) {
        return notificationRepo.findByUserIdAndIsReadFalse(userId);
    }

    public Notification markAsRead(Long id) {
        Notification n = notificationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        n.setRead(true);
        return notificationRepo.save(n);
    }
}