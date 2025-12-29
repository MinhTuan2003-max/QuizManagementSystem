package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.ApiResponseDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    private final MessageSource messageSource;

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleBaseException(BaseException ex) {
        String translatedMessage = messageSource.getMessage(
                ex.getMessage(),
                ex.getArgs(),
                ex.getMessage(),
                LocaleContextHolder.getLocale()
        );

        log.error("Application exception: {} - {}", ex.getErrorCode(), translatedMessage);

        ApiResponseDTO<Void> response = ApiResponseDTO.error(
                ex.getHttpStatus().value(),
                translatedMessage,
                Map.of("errorCode", ex.getErrorCode())
        );

        return new ResponseEntity<>(response, ex.getHttpStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = messageSource.getMessage(error, LocaleContextHolder.getLocale());
            errors.put(fieldName, errorMessage);
        });

        return new ResponseEntity<>(ApiResponseDTO.error(400, "Validation failed", errors), HttpStatus.BAD_REQUEST);
    }
}