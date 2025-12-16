package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.AnswerDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Answer;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Question;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceNotFoundException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.QuestionRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    @Override
    @Transactional
    public QuestionResponseDTO createQuestion(QuestionRequestDTO request) {
        // 1. Map DTO -> Entity
        Question question = Question.builder()
                .content(request.content())
                .type(request.type())
                .score(request.score())
                .build();

        // 2. Map Answers & Set Relationship (Bi-directional)
        List<Answer> answers = request.answers().stream()
                .map(dto -> Answer.builder()
                        .content(dto.content())
                        .isCorrect(dto.isCorrect())
                        .question(question) // Quan trọng: Set parent cho child
                        .build())
                .collect(Collectors.toList());

        question.setAnswers(answers);

        // 3. Save (Cascade ALL sẽ tự lưu answers)
        Question saved = questionRepository.save(question);

        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<QuestionResponseDTO> getAllQuestions(Pageable pageable) {
        // Chỉ lấy câu hỏi Active
        Page<Question> page = questionRepository.findByActiveTrue(pageable);

        // Convert Page<Entity> -> PageResponse<DTO>
        return PageResponseDTO.from(page.map(this::mapToResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public QuestionResponseDTO getQuestionById(UUID id) {
        Question question = questionRepository.findById(id)
                .filter(Question::isActive) // Check active thủ công
                // Sử dụng Factory Method chuẩn
                .orElseThrow(() -> ResourceNotFoundException.questionNotFound(id));

        return mapToResponse(question);
    }

    @Override
    @Transactional
    public QuestionResponseDTO updateQuestion(UUID id, QuestionRequestDTO request) {
        Question question = questionRepository.findById(id)
                .filter(Question::isActive)
                // Sử dụng Factory Method chuẩn
                .orElseThrow(() -> ResourceNotFoundException.questionNotFound(id));

        // Update basic fields
        question.setContent(request.content());
        question.setType(request.type());
        question.setScore(request.score());

        // Update Answers (Clear old, add new to leverage Orphan Removal)
        question.getAnswers().clear();

        List<Answer> newAnswers = request.answers().stream()
                .map(dto -> Answer.builder()
                        .content(dto.content())
                        .isCorrect(dto.isCorrect())
                        .question(question)
                        .build())
                .toList();

        question.getAnswers().addAll(newAnswers);

        Question updated = questionRepository.save(question);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteQuestion(UUID id) {
        Question question = questionRepository.findById(id)
                // Sử dụng Factory Method chuẩn
                .orElseThrow(() -> ResourceNotFoundException.questionNotFound(id));

        // Soft Delete: Set active = false
        question.setActive(false);
        // Với Cascade Type, nếu muốn soft delete cả answer thì cần xử lý thêm ở đây hoặc trong entity listeners
        // Nhưng logic đơn giản chỉ cần ẩn Question là đủ
        questionRepository.save(question);
    }

    // Helper Mapper
    private QuestionResponseDTO mapToResponse(Question q) {
        List<AnswerDTO> answerDtos = q.getAnswers().stream()
                .map(a -> new AnswerDTO(a.getId(), a.getContent(), a.isCorrect()))
                .toList();

        return new QuestionResponseDTO(
                q.getId(),
                q.getContent(),
                q.getType(),
                q.getScore(),
                answerDtos
        );
    }
}