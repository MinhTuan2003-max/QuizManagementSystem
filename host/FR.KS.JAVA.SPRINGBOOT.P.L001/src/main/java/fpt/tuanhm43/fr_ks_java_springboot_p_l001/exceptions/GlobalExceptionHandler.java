package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.ApiResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * Global exception handler for the application.
 * Provides centralized exception handling and consistent error responses.
 */
@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private static final String DEFAULT_ERROR_MESSAGE = "errorCode";
    private final MessageSource messageSource;

    /**
     * Handles all custom base exceptions (ResourceNotFound, BadRequest, etc.)
     */
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleBaseException(BaseException ex) {
        log.error("Application exception: {} - {}", ex.getErrorCode(), ex.getMessage());

        // Sử dụng Map để trả về error code trong field errors
        Map<String, String> errorDetails = Map.of(DEFAULT_ERROR_MESSAGE, ex.getErrorCode());

        ApiResponseDTO<Void> response = ApiResponseDTO.error(
                ex.getHttpStatus().value(),
                ex.getMessage(),
                errorDetails
        );

        return new ResponseEntity<>(response, ex.getHttpStatus());
    }

    /**
     * Handles Spring Security BadCredentialsException (Login failed)
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleBadCredentials(BadCredentialsException ex) {
        log.warn("Authentication failed: {}", ex.getMessage());

        ApiResponseDTO<Void> response = ApiResponseDTO.error(
                HttpStatus.UNAUTHORIZED.value(),
                "Email or Password incorrect",
                Map.of(DEFAULT_ERROR_MESSAGE, "AUTH_002")
        );

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Handles Spring Security AccessDeniedException (403)
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleAccessDenied(AccessDeniedException ex) {
        log.warn("Access denied: {}", ex.getMessage());

        ApiResponseDTO<Void> response = ApiResponseDTO.error(
                HttpStatus.FORBIDDEN.value(),
                "You do not have permission to access this resource",
                Map.of(DEFAULT_ERROR_MESSAGE, "AUTH_003")
        );

        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    /**
     * Handles validation exceptions from @Valid annotation.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        log.warn("Validation failed: {}", ex.getMessage());

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = messageSource.getMessage(error, LocaleContextHolder.getLocale());
            errors.put(fieldName, errorMessage);
        });

        ApiResponseDTO<Void> response = ApiResponseDTO.error(
                HttpStatus.BAD_REQUEST.value(),
                "Validation failed",
                errors
        );

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles all other uncaught exceptions (500).
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleGenericException(Exception ex) {
        log.error("Unexpected error occurred", ex);

        ApiResponseDTO<Void> response = ApiResponseDTO.error(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An unexpected error occurred. Please try again later.",
                Map.of("details", ex.getMessage())
        );

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}