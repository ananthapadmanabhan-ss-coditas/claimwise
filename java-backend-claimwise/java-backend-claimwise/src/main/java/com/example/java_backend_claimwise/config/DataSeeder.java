package com.example.java_backend_claimwise.config;

import com.example.java_backend_claimwise.constants.Role;
import com.example.java_backend_claimwise.entity.Users;
import com.example.java_backend_claimwise.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        seedUser("arya.gaikwad@coditas.com","Arya", Role.ADMIN, LocalDateTime.now());
        seedUser("nikita.bachute@coditas.com","Nikita",Role.ADJUSTER, LocalDateTime.now());
        seedUser("ananthapadmanabhan.s.s@coditas.com","Ananthapadmana",Role.CLAIMANT, LocalDateTime.now());
    }

    private void seedUser(String mail, String username, Role role, LocalDateTime now) {
        if(!userRepository.existsByEmail(mail)) {
            Users user = new Users();
            user.setEmail(mail);
            user.setName(username);
            user.setRole(role);
            user.setCreatedAt(now);
            userRepository.save(user);
            log.info("User {} has been seeded", mail);
        }
    }
}
