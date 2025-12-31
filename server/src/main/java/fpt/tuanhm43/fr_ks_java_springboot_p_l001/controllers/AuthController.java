package fpt.tuanhm43.fr_ks_java_springboot_p_l001.controllers;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.ApiResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth.*;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Login and Register APIs")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Login to system")
    public ResponseEntity<ApiResponseDTO<AuthResponseDTO>> login(@Valid @RequestBody LoginRequestDTO request) {
        AuthResponseDTO response = authService.login(request);
        return ResponseEntity.ok(ApiResponseDTO.success(response, "Login successful"));
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Register new user")
    public ResponseEntity<ApiResponseDTO<Void>> register(@Valid @RequestBody RegisterRequestDTO request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.created(null, "User registered successfully"));
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Refresh access token using refresh token")
    public ResponseEntity<ApiResponseDTO<TokenRefreshResponseDTO>> refreshToken(
            @Valid @RequestBody TokenRefreshRequestDTO request) {

        TokenRefreshResponseDTO response = authService.refreshToken(request);

        return ResponseEntity.ok(
                ApiResponseDTO.success(response, "Token refreshed successfully")
        );
    }
}