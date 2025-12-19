package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.utils.StrongPassword;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Request payload for user registration")
public record RegisterRequestDTO(
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        @Schema(description = "User email address", example = "newuser@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
        String email,

        @NotBlank(message = "Password is required")
        @StrongPassword
        @Schema(description = "User password", example = "Secret@123", minLength = 8, requiredMode = Schema.RequiredMode.REQUIRED)
        String password,

        @NotBlank(message = "Full name is required")
        @Size(max = 100, message = "Full name must not exceed 100 characters")
        @Schema(description = "User full name", example = "Nguyen Van A", requiredMode = Schema.RequiredMode.REQUIRED)
        String fullName
) {}