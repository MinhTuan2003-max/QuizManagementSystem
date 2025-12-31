package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionResponseDTO;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface QuestionService {
    QuestionResponseDTO insert(QuestionRequestDTO request);

    PageResponseDTO<QuestionResponseDTO> findWithPaging(Pageable pageable);

    PageResponseDTO<QuestionResponseDTO> searchWithPaging(String keyword, String status, Pageable pageable);

    QuestionResponseDTO findById(UUID id);

    QuestionResponseDTO update(UUID id, QuestionRequestDTO request);

    void delete(UUID id);
}