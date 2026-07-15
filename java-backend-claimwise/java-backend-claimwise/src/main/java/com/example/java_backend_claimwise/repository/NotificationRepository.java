package com.example.java_backend_claimwise.repository;

import com.example.java_backend_claimwise.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
    Optional<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Notification> findByUserIdAndIsReadFalse(Long userId);
}
