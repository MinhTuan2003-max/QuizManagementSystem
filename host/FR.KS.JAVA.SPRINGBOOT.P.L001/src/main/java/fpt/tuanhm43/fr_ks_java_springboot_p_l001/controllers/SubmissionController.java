package fpt.tuanhm43.fr_ks_java_springboot_p_l001.controllers;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.ApiResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.submission.ResultResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.submission.SubmitRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.SubmissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/exam")
@RequiredArgsConstructor
@Tag(name = "Submission & Exam", description = "APIs for submitting quiz and viewing results")
@SecurityRequirement(name = "bearerAuth")
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping
    @Operation(summary = "Submit quiz answers")
    public ResponseEntity<ApiResponseDTO<ResultResponseDTO>> submitQuiz(
            @Valid @RequestBody SubmitRequestDTO request,
            Authentication authentication) {

        // Lấy email user từ Token (Principal)
        String userEmail = authentication.getName();

        ResultResponseDTO result = submissionService.submitQuiz(request, userEmail);

        return ResponseEntity.ok(ApiResponseDTO.success(result, "Quiz submitted successfully"));
    }
}