package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Request payload for creating or updating a user")
public record UserRequestDTO(
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        @Schema(description = "User email", example = "user@example.com", requiredMode = Schema.RequiredMode.REQUIRED)
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters")
        @Schema(description = "Password (encrypted before saving)", example = "User@123", minLength = 8, requiredMode = Schema.RequiredMode.REQUIRED)
        String password,

        @NotBlank(message = "Full name is required")
        @Size(max = 100, message = "Full name max 100 chars")
        @Schema(description = "Full name", example = "Tran Van B", requiredMode = Schema.RequiredMode.REQUIRED)
        String fullName
) {}