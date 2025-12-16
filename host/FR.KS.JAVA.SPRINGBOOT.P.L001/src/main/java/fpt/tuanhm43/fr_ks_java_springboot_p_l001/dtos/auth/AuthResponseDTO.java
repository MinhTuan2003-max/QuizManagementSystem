package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Authentication response containing JWT token")
public record AuthResponseDTO(
        @Schema(description = "JWT Access Token", example = "eyJhbGciOiJIUzI1NiJ9...")
        String token,

        @Schema(description = "User email", example = "admin@example.com")
        String email,

        @Schema(description = "User role", example = "ROLE_ADMIN")
        String role
) {}