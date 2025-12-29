package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.submission;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.UUID;

@Schema(description = "Quiz submission result")
public record ResultResponseDTO(
        @Schema(description = "Submission ID")
        UUID submissionId,

        @Schema(description = "Total score achieved", example = "85.5")
        Double score,

        @Schema(description = "Total questions in the quiz", example = "10")
        Integer totalQuestions,

        @Schema(description = "Number of correct answers", example = "8")
        Integer correctAnswers,

        @Schema(description = "Time of submission")
        LocalDateTime submissionTime,

        @Schema(description = "Feedback message", example = "Passed")
        String feedback
) {}