package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.AnswerDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizDetailResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.BaseEntity;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Quiz;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceNotFoundException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.QuizRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;

    @Override
    @Transactional
    public QuizResponseDTO createQuiz(QuizRequestDTO request) {
        Quiz quiz = Quiz.builder()
                .title(request.title())
                .description(request.description())
                .durationMinutes(request.durationMinutes())
                .build();

        Quiz saved = quizRepository.save(quiz);
        return mapToSummaryResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<QuizResponseDTO> getAllQuizzes(Pageable pageable) {
        Page<Quiz> page = quizRepository.findByActiveTrue(pageable);
        return PageResponseDTO.from(page.map(this::mapToSummaryResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<QuizResponseDTO> searchQuizzes(String keyword, Pageable pageable) {
        Page<Quiz> page = quizRepository.findByTitleContainingIgnoreCase(keyword, pageable);
        return PageResponseDTO.from(page.map(this::mapToSummaryResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public QuizDetailResponseDTO getQuizDetail(UUID id) {
        Quiz quiz = quizRepository.findDetailById(id)
                .filter(Quiz::isActive)
                .orElseThrow(() -> ResourceNotFoundException.quizNotFound(id));

        List<QuestionResponseDTO> questions = quiz.getQuestions().stream()
                .filter(BaseEntity::isActive)
                .map(q -> {
                    List<AnswerDTO> answers = q.getAnswers().stream()
                            .map(a -> new AnswerDTO(a.getId(), a.getContent(), a.isCorrect()))
                            .toList();
                    return new QuestionResponseDTO(q.getId(), q.getContent(), q.getType(), q.getScore(), answers);
                })
                .toList();

        return new QuizDetailResponseDTO(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getDescription(),
                quiz.getDurationMinutes(),
                questions
        );
    }

    @Transactional
    public void softDeleteQuiz(UUID id) {
        quizRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.quizNotFound(id));
        quizRepository.softDeleteQuiz(id);
    }

    @Transactional
    public QuizResponseDTO updateQuiz(UUID id, QuizRequestDTO request) {
        Quiz quiz = quizRepository.findById(id)
                .filter(Quiz::isActive)
                .orElseThrow(() -> ResourceNotFoundException.quizNotFound(id));

        quiz.setTitle(request.title());
        quiz.setDescription(request.description());
        quiz.setDurationMinutes(request.durationMinutes());

        Quiz updated = quizRepository.save(quiz);
        return mapToSummaryResponse(updated);
    }

    private QuizResponseDTO mapToSummaryResponse(Quiz q) {
        return new QuizResponseDTO(
                q.getId(),
                q.getTitle(),
                q.getDescription(),
                q.getDurationMinutes(),
                q.isActive()
        );
    }
}