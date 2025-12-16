package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizDetailResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizResponseDTO;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface QuizService {
    QuizResponseDTO createQuiz(QuizRequestDTO request);
    PageResponseDTO<QuizResponseDTO> getAllQuizzes(Pageable pageable);
    QuizDetailResponseDTO getQuizDetail(UUID id);
    // Add more methods like update/delete/addQuestionToQuiz as needed
}