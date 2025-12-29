package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;

@Schema(description = "Quiz summary response")
public record QuizResponseDTO(
        @Schema(description = "Quiz ID")
        UUID id,

        @Schema(description = "Quiz title", example = "Java Basic Exam")
        String title,

        @Schema(description = "Quiz description")
        String description,

        @Schema(description = "Duration in minutes", example = "45")
        Integer durationMinutes,

        @Schema(description = "Active status", example = "true")
        boolean active
) {}