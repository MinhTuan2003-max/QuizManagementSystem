package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth;

import jakarta.validation.constraints.NotBlank;

public record TokenRefreshRequestDTO(
        @NotBlank(message = "Refresh token is required")
        String refreshToken
) {}

