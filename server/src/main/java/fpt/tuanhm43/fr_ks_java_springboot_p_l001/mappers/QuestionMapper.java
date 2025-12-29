package fpt.tuanhm43.fr_ks_java_springboot_p_l001.mappers;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.*;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.*;
import org.mapstruct.*;

import java.util.Set;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        builder = @Builder(disableBuilder = true)
)
public interface QuestionMapper {

    Set<Answer> toAnswerEntities(Set<AnswerDTO> dtos);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "quizzes", ignore = true)
    @Mapping(target = "active", constant = "true")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Question toEntity(QuestionRequestDTO dto);

    QuestionResponseDTO toResponse(Question entity);

    QuestionResponseDTO toSummary(Question entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "quizzes", ignore = true)
    @Mapping(target = "answers", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    void updateEntity(QuestionRequestDTO dto, @MappingTarget Question entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "question", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "correct", source = "isCorrect")
    Answer toAnswerEntity(AnswerDTO dto);
}