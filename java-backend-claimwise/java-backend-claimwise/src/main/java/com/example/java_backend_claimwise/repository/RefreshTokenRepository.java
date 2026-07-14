package com.example.java_backend_claimwise.repository;

import com.example.java_backend_claimwise.entity.RefreshToken;
import com.example.java_backend_claimwise.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
}
