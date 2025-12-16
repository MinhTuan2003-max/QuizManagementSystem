package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record TokenRefreshRequestDTO(
        @NotBlank(message = "Refresh token is required")
        @Schema(description = "Refresh token", example = "dGhpc0lzQVRlc3RSZWZyZXNoVG9rZW4...", requiredMode = Schema.RequiredMode.REQUIRED)
        String refreshToken
) {}