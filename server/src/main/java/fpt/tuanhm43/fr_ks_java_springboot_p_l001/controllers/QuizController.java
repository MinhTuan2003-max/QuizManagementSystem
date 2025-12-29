package fpt.tuanhm43.fr_ks_java_springboot_p_l001.controllers;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.constants.AppConstants;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.ApiResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizDetailResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.quiz.QuizResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.QuizService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
@Tag(name = "Quiz & Exam", description = "Quiz management and Submission")
@SecurityRequirement(name = "bearerAuth")
public class QuizController {

    private final QuizService quizService;

    @PostMapping
    @PreAuthorize("hasRole('" + AppConstants.ROLE_ADMIN + "')")
    @Operation(summary = "Create new quiz")
    public ResponseEntity<ApiResponseDTO<QuizResponseDTO>> createQuiz(@Valid @RequestBody QuizRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.created(quizService.createQuiz(request), "Quiz created successfully"));
    }

    @GetMapping
    @Operation(summary = "Get all quizzes or search by title")
    public ResponseEntity<ApiResponseDTO<PageResponseDTO<QuizResponseDTO>>> getAllQuizzes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String order,
            @RequestParam(required = false) String keyword
    ) {
        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        PageResponseDTO<QuizResponseDTO> result;
        if (keyword != null && !keyword.isBlank()) {
            result = quizService.searchQuizzes(keyword, pageable);
        } else {
            result = quizService.getAllQuizzes(pageable);
        }
        return ResponseEntity.ok(ApiResponseDTO.success(result));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get quiz detail with questions")
    public ResponseEntity<ApiResponseDTO<QuizDetailResponseDTO>> getQuizDetail(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponseDTO.success(quizService.getQuizDetail(id)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('" + AppConstants.ROLE_ADMIN + "')")
    @Operation(summary = "Update quiz")
    public ResponseEntity<ApiResponseDTO<QuizResponseDTO>> updateQuiz(
            @PathVariable UUID id,
            @Valid @RequestBody QuizRequestDTO request) {
        return ResponseEntity.ok(ApiResponseDTO.success(quizService.updateQuiz(id, request), "Quiz updated successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + AppConstants.ROLE_ADMIN + "')")
    @Operation(summary = "Delete quiz")
    public ResponseEntity<ApiResponseDTO<Void>> deleteQuiz(@PathVariable UUID id) {
        quizService.softDeleteQuiz(id);
        return ResponseEntity.ok(ApiResponseDTO.success(null, "Quiz deleted successfully"));
    }
}