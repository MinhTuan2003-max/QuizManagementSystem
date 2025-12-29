package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionResponseDTO;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface QuestionService {
    QuestionResponseDTO createQuestion(QuestionRequestDTO request);
    PageResponseDTO<QuestionResponseDTO> getAllQuestions(Pageable pageable);
    QuestionResponseDTO getQuestionById(UUID id);
    QuestionResponseDTO updateQuestion(UUID id, QuestionRequestDTO request);
    void softDeleteQuestion(UUID id);
}