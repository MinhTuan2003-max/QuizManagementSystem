package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.User;
import org.springframework.security.core.Authentication;

import java.util.Set;

public interface TokenService {
    /**
     * Tạo JWT Token từ thông tin User
     */
    String generateToken(User user, Set<String> roles);

    /**
     * Parse Token và lấy ra đối tượng Authentication để set vào SecurityContext
     */
    Authentication getAuthenticationFromToken(String token);
}