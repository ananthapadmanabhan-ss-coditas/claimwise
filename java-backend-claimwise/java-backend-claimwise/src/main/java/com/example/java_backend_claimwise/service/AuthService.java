package com.example.java_backend_claimwise.service;

import com.example.java_backend_claimwise.dto.AuthResponse;
import com.example.java_backend_claimwise.dto.CreateUserDto;
import com.example.java_backend_claimwise.dto.RefreshDto;
import com.example.java_backend_claimwise.entity.OtpToken;
import com.example.java_backend_claimwise.entity.RefreshToken;
import com.example.java_backend_claimwise.entity.Users;
import com.example.java_backend_claimwise.exceptions.AppException;
import com.example.java_backend_claimwise.exceptions.EmailNotFoundException;
import com.example.java_backend_claimwise.exceptions.InvalidOtpException;
import com.example.java_backend_claimwise.jwt.JwtUtil;
import com.example.java_backend_claimwise.repository.OtpTokenRepository;
import com.example.java_backend_claimwise.repository.RefreshTokenRepository;
import com.example.java_backend_claimwise.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepo;
    private final OtpTokenRepository otpRepo;
    private final RefreshTokenRepository  refreshTokenRepo;
    private final JwtUtil jwtUtil;
    private final JavaMailSender  mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void requestOtp(@Email @NotBlank(message = "Email cannot be blank") String email) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(()-> new EmailNotFoundException("User with the email has not been found "));

        String code = String.valueOf(10000+ new Random().nextInt(900000));

        otpRepo.save(OtpToken.builder()
                .email(email)
                .code(code)
                .expiresAt(LocalDateTime.now().plusMinutes(5))
                .used(false)
                .build());

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("Your ClaimWise login code");
        message.setText("Your OTP is " + code + ". It expires in 5 minutes.");
        mailSender.send(message);

    }

    public AuthResponse verifyOtp(@Email @NotBlank(message = "Email cannot be blank") String email, String code) {
        OtpToken otp = otpRepo.findTopByEmailAndUsedFalseOrderByIdDesc(email)
                .orElseThrow(()-> new AppException("Otp Not found for this email"));

        if(otp.isUsed() || otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new InvalidOtpException("The Otp has expired");
        }

        if(!otp.getCode().equals(code)) {
            throw new InvalidOtpException("Invalid OTP");
        }

        otp.setUsed(true);
        otpRepo.save(otp);

        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return issueTokens(user);
    }


    public AuthResponse refresh(@Valid RefreshDto dto) {
        RefreshToken stored = refreshTokenRepo.findByToken(dto.getRefreshToken())
                .orElseThrow(()-> new AppException("Token has been expired"));

        if(stored.isRevoked() || stored.getExpiresAt().isBefore(LocalDateTime.now())){
            throw new RuntimeException("Session has expired can you please login in again");
        }

        stored.setRevoked(true);
        refreshTokenRepo.save(stored);

        return issueTokens(stored.getUser());

    }

    private AuthResponse issueTokens(Users user) {

        String accessToken = jwtUtil.generateAccessToken(user);

        RefreshToken refreshToken = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .user(user)
                .expiresAt(LocalDateTime.now().plusDays(7))
                .revoked(false)
                .build();

        refreshTokenRepo.save(refreshToken);

        return new AuthResponse(accessToken,refreshToken.getToken(),user.getRole().name());
    }

    public Users createUser(CreateUserDto dto){
        if (userRepo.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("A user with this email already exists");
        }
        Users user = Users.builder()
                .email(dto.getEmail())
                .role(dto.getRole())
                .build();

        userRepo.save(user);
        sendWelcomeEmail(user);
        return user;
    }

    private void sendWelcomeEmail(Users user) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(fromEmail);
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Welcome To ClaimWise");
        mailMessage.setText(
                "Hi " + user.getName() + ",\n\n" +
                        "An account has been created for you on ClaimWise as a " + user.getRole().name() + ".\n" +
                        "To log in, just enter your email at the login page and we'll send you a one-time code — no password needed.\n\n" +
                        "Welcome aboard."
        );
        mailSender.send(mailMessage);

    }

    public Users getUser(Long userId) {
        return userRepo.findById(userId)
                .orElseThrow(()-> new AppException("User not found"));
    }

}

