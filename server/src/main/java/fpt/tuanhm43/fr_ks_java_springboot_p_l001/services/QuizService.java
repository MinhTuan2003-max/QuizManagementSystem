package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizDetailResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizResponseDTO;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface QuizService {
    QuizResponseDTO insert(QuizRequestDTO request);

    PageResponseDTO<QuizResponseDTO> getWithPaging(Pageable pageable);

    QuizDetailResponseDTO getById(UUID id);

    QuizResponseDTO update(UUID id, QuizRequestDTO request);

    PageResponseDTO<QuizResponseDTO> searchWithPaging(String keyword, String status, Pageable pageable);

    void delete(UUID id);
}