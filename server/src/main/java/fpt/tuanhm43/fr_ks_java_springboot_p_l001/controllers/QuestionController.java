package fpt.tuanhm43.fr_ks_java_springboot_p_l001.controllers;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.constants.AppConstants;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.ApiResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.QuestionService;
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
@RequestMapping("/api/v1/questions")
@RequiredArgsConstructor
@Tag(name = "Question Management", description = "APIs for managing questions")
@SecurityRequirement(name = "bearerAuth")
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    @PreAuthorize("hasRole('" + AppConstants.ROLE_ADMIN + "')")
    @Operation(summary = "Create new question")
    public ResponseEntity<ApiResponseDTO<QuestionResponseDTO>> createQuestion(@Valid @RequestBody QuestionRequestDTO request) {
        QuestionResponseDTO response = questionService.insert(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.created(response, "Question created successfully"));
    }

    @GetMapping
    @Operation(summary = "Get all questions with pagination")
    public ResponseEntity<ApiResponseDTO<PageResponseDTO<QuestionResponseDTO>>> getAllQuestions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String order
    ) {
        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(ApiResponseDTO.success(questionService.findWithPaging(pageable)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get question details")
    public ResponseEntity<ApiResponseDTO<QuestionResponseDTO>> getQuestionById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponseDTO.success(questionService.findById(id)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('" + AppConstants.ROLE_ADMIN + "')")
    @Operation(summary = "Update question")
    public ResponseEntity<ApiResponseDTO<QuestionResponseDTO>> updateQuestion(
            @PathVariable UUID id,
            @Valid @RequestBody QuestionRequestDTO request) {
        return ResponseEntity.ok(ApiResponseDTO.success(questionService.update(id, request), "Question updated successfully"));
    }

    @GetMapping("/search")
    @Operation(summary = "Search questions by content")
    public ResponseEntity<ApiResponseDTO<PageResponseDTO<QuestionResponseDTO>>> searchQuestions(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String order,
            @RequestParam(required = false) String status
    ) {
        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(ApiResponseDTO.success(questionService.searchWithPaging(keyword, status, pageable)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('" + AppConstants.ROLE_ADMIN + "')")
    @Operation(summary = "Delete (Soft) question")
    public ResponseEntity<ApiResponseDTO<Void>> deleteQuestion(@PathVariable UUID id) {
        questionService.delete(id);
        return ResponseEntity.ok(ApiResponseDTO.success(null, "Question deleted successfully"));
    }
}