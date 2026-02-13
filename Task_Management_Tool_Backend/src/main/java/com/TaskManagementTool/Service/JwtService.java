package com.TaskManagementTool.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;

@Service
public class JwtService {

    // Use a strong secret (at least 32 characters)
    private static final String SECRET_KEY = "your-256-bit-secret-your-256-bit-secret";

    // Generate the signing key from plain text
    private Key getSignKey() {
        return new SecretKeySpec(
                SECRET_KEY.getBytes(StandardCharsets.UTF_8),
                SignatureAlgorithm.HS256.getJcaName()
        );
    }

    // Generate token WITHOUT expiration
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract all claims, safely ignoring expiration
    public Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            // Ignore expiration and return claims
            return e.getClaims();
        }
    }

    // Extract the username from the token
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }
}
