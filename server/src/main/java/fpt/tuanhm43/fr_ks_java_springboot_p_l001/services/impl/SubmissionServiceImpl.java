package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.constants.AppConstants;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.submission.ResultResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.submission.SubmitRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.*;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceNotFoundException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.mappers.SubmissionMapper;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.QuizRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.QuizSubmissionRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.UserRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.SubmissionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {

    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final QuizSubmissionRepository submissionRepository;
    private final SubmissionMapper submissionMapper;

    @Override
    @Transactional
    @fpt.tuanhm43.fr_ks_java_springboot_p_l001.aspect.TrackActivity("Submit Quiz")
    public ResultResponseDTO submitQuiz(SubmitRequestDTO request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> ResourceNotFoundException.userNotFound(userEmail));

        Quiz quiz = quizRepository.findDetailById(request.quizId())
                .filter(Quiz::isActive)
                .orElseThrow(() -> ResourceNotFoundException.quizNotFound(request.quizId()));

        Map<UUID, List<UUID>> userAnswersMap = request.answers().stream()
                .collect(Collectors.groupingBy(
                        SubmitRequestDTO.SelectedAnswerDTO::questionId,
                        Collectors.mapping(SubmitRequestDTO.SelectedAnswerDTO::answerId, Collectors.toList())
                ));

        double totalScore = 0;
        int correctCount = 0;
        int totalQuestions = quiz.getQuestions().size();

        for (Question question : quiz.getQuestions()) {
            List<UUID> userSelectedAnswerIds = userAnswersMap.getOrDefault(question.getId(), List.of());
            List<UUID> correctAnswerIds = question.getAnswers().stream()
                    .filter(Answer::isCorrect)
                    .map(Answer::getId)
                    .toList();

            boolean isCorrect = false;
            switch (question.getType()) {
                case SINGLE_CHOICE:
                    if (userSelectedAnswerIds.size() == 1 && correctAnswerIds.contains(userSelectedAnswerIds.getFirst())) {
                        isCorrect = true;
                    }
                    break;
                case MULTIPLE_CHOICE:
                    if (userSelectedAnswerIds.size() == correctAnswerIds.size()
                            && new HashSet<>(userSelectedAnswerIds).containsAll(correctAnswerIds)) {
                        isCorrect = true;
                    }
                    break;
                default:
                    throw new IllegalStateException("Unexpected value: " + question.getType());
            }

            if (isCorrect) {
                totalScore += question.getScore();
                correctCount++;
            }
        }

        QuizSubmission submission = QuizSubmission.builder()
                .user(user)
                .quiz(quiz)
                .score(totalScore)
                .submissionTime(LocalDateTime.now())
                .build();

        QuizSubmission saved = submissionRepository.save(submission);

        String feedback = ((double) correctCount / totalQuestions) >= 0.5 ? AppConstants.FEEDBACK_PASSED : AppConstants.FEEDBACK_FAILED;

        return submissionMapper.toResult(saved, totalScore, totalQuestions, correctCount, feedback);
    }
}