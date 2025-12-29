package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Request payload for user login")
public record LoginRequestDTO(
        @NotBlank(message = "{validation.email.required}")
        @Email(message = "{validation.email.invalid}")
        @Schema(description = "User email address", example = "admin@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
        String email,

        @NotBlank(message = "{validation.password.required}")
        @Schema(description = "User password", example = "Admin@123", requiredMode = Schema.RequiredMode.REQUIRED)
        String password
) {}