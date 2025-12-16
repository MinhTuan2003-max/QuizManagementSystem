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
        Page<Quiz> page = quizRepository.findAll(pageable); // Có thể thêm filter active
        return PageResponseDTO.from(page.map(this::mapToSummaryResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public QuizDetailResponseDTO getQuizDetail(UUID id) {
        // Sử dụng method có @EntityGraph để tránh lỗi N+1
        Quiz quiz = quizRepository.findDetailById(id)
                .filter(Quiz::isActive)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found"));

        // Map chi tiết kèm Questions
        List<QuestionResponseDTO> questions = quiz.getQuestions().stream()
                .filter(BaseEntity::isActive) // Chỉ lấy câu hỏi active
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