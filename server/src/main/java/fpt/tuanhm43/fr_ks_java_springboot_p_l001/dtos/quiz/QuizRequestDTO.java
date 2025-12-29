package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Schema(description = "Request payload for creating/updating a Quiz")
public record QuizRequestDTO(
        @NotBlank(message = "Title is required")
        @Size(max = 150, message = "Title must not exceed 150 characters")
        @Schema(description = "Quiz title", example = "Java Basic Exam", requiredMode = Schema.RequiredMode.REQUIRED)
        String title,

        @Size(max = 500, message = "Description must not exceed 500 characters")
        @Schema(description = "Quiz description", example = "Test your basic Java knowledge")
        String description,

        @NotNull(message = "Duration is required")
        @Min(value = 1, message = "Duration must be at least 1 minute")
        @Schema(description = "Duration in minutes", example = "45", requiredMode = Schema.RequiredMode.REQUIRED)
        Integer durationMinutes
) {}