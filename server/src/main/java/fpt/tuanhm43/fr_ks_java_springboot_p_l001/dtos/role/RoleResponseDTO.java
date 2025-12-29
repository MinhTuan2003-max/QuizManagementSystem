package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.role;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record RoleResponseDTO(
        @Schema(description = "Role name", example = "ROLE_ADMIN")
        @Enumerated(EnumType.STRING)
        String roleName
) {
}
