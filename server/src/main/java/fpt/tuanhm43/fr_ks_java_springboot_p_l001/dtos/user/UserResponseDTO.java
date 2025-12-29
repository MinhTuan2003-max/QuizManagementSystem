package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Schema(description = "User details response")
public record UserResponseDTO(
        @Schema(description = "User ID", example = "123e4567-e89b-12d3-a456-426614174000")
        UUID id,

        @Schema(description = "User email", example = "user@example.com")
        String email,

        @Schema(description = "Full name", example = "Tran Van B")
        String fullName,

        @Schema(description = "List of roles", example = "[\"ROLE_USER\", \"ROLE_ADMIN\"]")
        Set<String> roles,

        @Schema(description = "Account status", example = "true")
        boolean active,

        @Schema(description = "Account creation time")
        LocalDateTime createdAt
) {}