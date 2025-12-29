package fpt.tuanhm43.fr_ks_java_springboot_p_l001.mappers;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.submission.ResultResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.QuizSubmission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SubmissionMapper {

    @Mapping(target = "submissionId", source = "submission.id")
    @Mapping(target = "submissionTime", source = "submission.submissionTime")
    @Mapping(target = "correctAnswers", source = "correctCount")
    @Mapping(target = "score", source = "totalScore")
    ResultResponseDTO toResult(
            QuizSubmission submission,
            double totalScore,
            int totalQuestions,
            int correctCount,
            String feedback
    );
}
