package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.submission.ResultResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.submission.SubmitRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.*;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceNotFoundException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.QuizRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.QuizSubmissionRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.UserRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.SubmissionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final QuizSubmissionRepository submissionRepository;

    @Override
    @Transactional
    public ResultResponseDTO submitQuiz(SubmitRequestDTO request, String userEmail) {
        // 1. Fetch User & Quiz
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Quiz quiz = quizRepository.findDetailById(request.quizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found"));

        // 2. Logic tính điểm
        // Map questions by ID để truy cập nhanh
        Map<UUID, Question> questionMap = quiz.getQuestions().stream()
                .collect(Collectors.toMap(Question::getId, Function.identity()));

        double totalScore = 0;
        int correctCount = 0;
        int totalQuestions = quiz.getQuestions().size();

        for (SubmitRequestDTO.SelectedAnswerDTO answerDTO : request.answers()) {
            Question question = questionMap.get(answerDTO.questionId());

            if (question != null) {
                // Kiểm tra câu trả lời đúng
                // Logic đơn giản cho SINGLE_CHOICE: check ID đáp án
                boolean isCorrect = question.getAnswers().stream()
                        .anyMatch(a -> a.getId().equals(answerDTO.answerId()) && a.isCorrect());

                if (isCorrect) {
                    totalScore += question.getScore();
                    correctCount++;
                }
            }
        }

        // 3. Save Submission History
        QuizSubmission submission = QuizSubmission.builder()
                .user(user)
                .quiz(quiz)
                .score(totalScore)
                .submissionTime(LocalDateTime.now())
                .build();

        QuizSubmission saved = submissionRepository.save(submission);

        // 4. Return Result
        String feedback = ((double) correctCount / totalQuestions) >= 0.5 ? "PASSED" : "FAILED";

        return new ResultResponseDTO(
                saved.getId(),
                totalScore,
                totalQuestions,
                correctCount,
                saved.getSubmissionTime(),
                feedback
        );
    }
}