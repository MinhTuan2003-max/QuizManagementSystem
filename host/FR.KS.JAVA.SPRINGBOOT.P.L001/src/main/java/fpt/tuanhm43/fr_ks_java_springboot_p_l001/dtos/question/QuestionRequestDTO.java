package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.enums.QuestionType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

@Schema(description = "Request payload for creating/updating a Question")
public record QuestionRequestDTO(
        @NotBlank(message = "Question content is required")
        @Schema(description = "The question text", example = "What is Java?", requiredMode = Schema.RequiredMode.REQUIRED)
        String content,

        @NotNull(message = "Question type is required")
        @Schema(description = "Type of question", example = "SINGLE_CHOICE", requiredMode = Schema.RequiredMode.REQUIRED)
        QuestionType type,

        @NotNull(message = "Score is required")
        @Min(value = 1, message = "Score must be at least 1")
        @Schema(description = "Score for this question", example = "5", requiredMode = Schema.RequiredMode.REQUIRED)
        Integer score,

        @Valid
        @NotNull(message = "Answers cannot be null")
        @Size(min = 2, message = "At least 2 answers required")
        @Schema(description = "List of answers", requiredMode = Schema.RequiredMode.REQUIRED)
        List<AnswerDTO> answers
) {}