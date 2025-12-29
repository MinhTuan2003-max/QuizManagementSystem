package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.UUID;

@Schema(description = "Detailed quiz response including list of questions")
public record QuizDetailResponseDTO(
        @Schema(description = "Quiz ID")
        UUID id,

        @Schema(description = "Quiz title", example = "Java Advanced Exam")
        String title,

        @Schema(description = "Quiz description", example = "Comprehensive test on Streams and Concurrency")
        String description,

        @Schema(description = "Duration in minutes", example = "60")
        Integer durationMinutes,

        @Schema(description = "List of questions associated with this quiz")
        List<QuestionResponseDTO> questions
) {}