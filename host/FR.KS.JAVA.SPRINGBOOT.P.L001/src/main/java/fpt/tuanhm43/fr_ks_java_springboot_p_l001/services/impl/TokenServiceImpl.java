package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User; // Đây là User của Spring Security
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Implementation of TokenService for JWT token generation and validation.
 */
@Slf4j
@Service
public class TokenServiceImpl implements TokenService {

    // Sửa lại key theo application.properties
    @Value("${security.jwt.secret-key}")
    private String jwtSecret;

    @Value("${security.jwt.expiration}")
    private Long jwtExpirationInMs;

    @Override
    public String generateToken(fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.User user, Set<String> roles) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        SecretKey key = getSigningKey();

        return Jwts.builder()
                // Dùng Email làm Subject (định danh chính)
                .subject(user.getEmail())
                // Lưu thêm ID và FullName vào claims
                .claim("userId", user.getId().toString())
                .claim("fullName", user.getFullName())
                .claim("roles", roles)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }

    @Override
    public Authentication getAuthenticationFromToken(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }

        try {
            // Parse token
            Claims claims = Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            // Lấy email từ subject
            String email = claims.getSubject();

            // Lấy Roles từ claims
            @SuppressWarnings("unchecked")
            List<String> roles = claims.get("roles", List.class);

            // Convert Roles String -> GrantedAuthority
            Set<GrantedAuthority> authorities = roles.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toSet());

            // Tạo đối tượng User của Spring Security (Principal)
            // Constructor: User(username, password, authorities)
            User principal = new User(email, "", authorities);

            return new UsernamePasswordAuthenticationToken(principal, token, authorities);

        } catch (ExpiredJwtException e) {
            log.warn("JWT token is expired: {}", e.getMessage());
            return null;
        } catch (JwtException e) {
            log.warn("Invalid JWT token: {}", e.getMessage());
            return null;
        } catch (Exception e) {
            log.error("Cannot parse JWT token: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Helper: Tạo Key từ chuỗi Secret trong cấu hình
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}