package fpt.tuanhm43.fr_ks_java_springboot_p_l001.mappers;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.AnswerDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizDetailResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Answer;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Question;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Quiz;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface QuizMapper {

    QuizResponseDTO toSummary(Quiz quiz);

    @Mapping(target = "questions", source = "questions", qualifiedByName = "mapActiveQuestions")
    QuizDetailResponseDTO toDetail(Quiz quiz);

    @Named("mapActiveQuestions")
    default List<QuestionResponseDTO> mapActiveQuestions(Set<Question> questions) {
        return questions.stream()
                .map(this::toQuestion)
                .toList();
    }

    QuestionResponseDTO toQuestion(Question question);

    AnswerDTO toAnswer(Answer answer);
}
