package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizDetailResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Quiz;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceNotFoundException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.mappers.QuizMapper;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.QuizRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuizMapper quizMapper;

    @Override
    @Transactional
    public QuizResponseDTO insert(QuizRequestDTO request) {
        Quiz quiz = Quiz.builder().title(request.title()).description(request.description()).durationMinutes(request.durationMinutes()).build();

        return quizMapper.toSummary(quizRepository.save(quiz));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<QuizResponseDTO> getWithPaging(Pageable pageable) {
        Page<Quiz> page = quizRepository.findByActiveTrue(pageable);
        return PageResponseDTO.from(page.map(quizMapper::toSummary));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<QuizResponseDTO> searchWithPaging(String keyword, String status, Pageable pageable) {

        Specification<Quiz> spec = Specification.where((root, query, cb) -> cb.conjunction());

        if (keyword != null && !keyword.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("title")), "%" + keyword.toLowerCase() + "%")
            );
        }

        if ("active".equalsIgnoreCase(status)) {
            spec = spec.and((root, query, cb) -> cb.isTrue(root.get("isActive")));
        }
        Page<Quiz> page = quizRepository.findAll(spec, pageable);

        return PageResponseDTO.from(page.map(quizMapper::toSummary));
    }

    @Override
    @Transactional(readOnly = true)
    public QuizDetailResponseDTO getById(UUID id) {
        Quiz quiz = quizRepository.findDetailById(id).filter(Quiz::isActive).orElseThrow(() -> ResourceNotFoundException.quizNotFound(id));

        return quizMapper.toDetail(quiz);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        Quiz quiz = quizRepository.findById(id).filter(Quiz::isActive).orElseThrow(() -> ResourceNotFoundException.quizNotFound(id));

        quizRepository.softDeleteQuiz(quiz.getId());
    }

    @Override
    @Transactional
    public QuizResponseDTO update(UUID id, QuizRequestDTO request) {
        Quiz quiz = quizRepository.findById(id).filter(Quiz::isActive).orElseThrow(() -> ResourceNotFoundException.quizNotFound(id));

        quiz.setTitle(request.title());
        quiz.setDescription(request.description());
        quiz.setDurationMinutes(request.durationMinutes());

        return quizMapper.toSummary(quizRepository.save(quiz));
    }
}
