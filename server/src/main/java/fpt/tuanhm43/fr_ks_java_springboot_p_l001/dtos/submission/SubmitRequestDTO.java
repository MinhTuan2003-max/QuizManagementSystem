package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.submission;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.UUID;

@Schema(description = "Request payload for submitting a quiz")
public record SubmitRequestDTO(
        @NotNull(message = "Quiz ID is required")
        @Schema(description = "ID of the quiz being submitted", requiredMode = Schema.RequiredMode.REQUIRED)
        UUID quizId,

        @NotNull(message = "Answers list is required")
        @Size(min = 1, message = "At least one answer must be submitted")
        @Valid
        @Schema(description = "List of selected answers")
        List<SelectedAnswerDTO> answers
) {
    @Schema(description = "User's answer selection")
    public record SelectedAnswerDTO(
            @NotNull(message = "Question ID is required")
            @Schema(description = "Question ID")
            UUID questionId,

            @NotNull(message = "Answer ID is required")
            @Schema(description = "Selected Answer ID")
            UUID answerId
    ) {
    }
}