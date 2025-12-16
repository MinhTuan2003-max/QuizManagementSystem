package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

import org.springframework.http.HttpStatus;
import java.util.UUID;

/**
 * Exception thrown when a requested resource cannot be found.
 */
public class ResourceNotFoundException extends BaseException {

    private static final String DEFAULT_ERROR_CODE = "NOT_FOUND_001";

    public ResourceNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND, DEFAULT_ERROR_CODE);
    }

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue),
                HttpStatus.NOT_FOUND, DEFAULT_ERROR_CODE);
    }

    // --- Factory Methods ---

    public static ResourceNotFoundException userNotFound(String email) {
        return new ResourceNotFoundException("User", "email", email);
    }

    public static ResourceNotFoundException userNotFoundById(UUID id) {
        return new ResourceNotFoundException("User", "id", id);
    }

    public static ResourceNotFoundException roleNotFound(String roleName) {
        return new ResourceNotFoundException("Role", "name", roleName);
    }

    public static ResourceNotFoundException quizNotFound(UUID id) {
        return new ResourceNotFoundException("Quiz", "id", id);
    }

    public static ResourceNotFoundException questionNotFound(UUID id) {
        return new ResourceNotFoundException("Question", "id", id);
    }
}