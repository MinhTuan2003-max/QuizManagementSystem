package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.enums.QuestionType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.UUID;

@Schema(description = "Question details response")
public record QuestionResponseDTO(
        @Schema(description = "Question ID")
        UUID id,

        @Schema(description = "Question content")
        String content,

        @Schema(description = "Question type")
        QuestionType type,

        @Schema(description = "Score")
        Integer score,

        @Schema(description = "List of answers associated with this question")
        List<AnswerDTO> answers
) {}