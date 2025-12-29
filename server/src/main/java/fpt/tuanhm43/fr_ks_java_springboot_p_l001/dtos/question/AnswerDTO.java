package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

@Schema(description = "Answer details")
public record AnswerDTO(
        @Schema(description = "Answer ID (Null if creating new)", example = "uuid-goes-here")
        UUID id,

        @NotBlank(message = "Content is required")
        @Schema(description = "Answer content", example = "Java is an OOP language", requiredMode = Schema.RequiredMode.REQUIRED)
        String content,

        @NotNull(message = "IsCorrect flag is required")
        @Schema(description = "Is this the correct answer?", example = "true", requiredMode = Schema.RequiredMode.REQUIRED)
        Boolean isCorrect
) {}