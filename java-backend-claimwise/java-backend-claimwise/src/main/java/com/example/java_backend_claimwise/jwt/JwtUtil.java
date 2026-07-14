package com.example.java_backend_claimwise.jwt;

import com.example.java_backend_claimwise.entity.Users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private static final long ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000;

    public SecretKey getKey(){
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateAccessToken(Users user){
            return Jwts.builder()
                    .subject(user.getEmail())
                    .claim("userId",user.getId())
                    .issuedAt(new Date())
                    .expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRY))
                    .signWith(getKey())
                    .compact();
    }

    public Claims extractClaims(String token){
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseClaimsJws(token)
                .getPayload();
    }

    public boolean isValid(String token){
        try {
            extractClaims(token);
            return true;
        }
        catch (JwtException e){
            return false;
        }
    }

    public String extractEmail(String token){
        return extractClaims(token).getSubject();
    }
}
