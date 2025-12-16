package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown when attempting to create a resource that already exists.
 */
public class ResourceAlreadyExistsException extends BaseException {

    private static final String DEFAULT_ERROR_CODE = "CONFLICT_001";

    public ResourceAlreadyExistsException(String message) {
        super(message, HttpStatus.CONFLICT, DEFAULT_ERROR_CODE);
    }

    public ResourceAlreadyExistsException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s with %s '%s' already exists", resourceName, fieldName, fieldValue),
                HttpStatus.CONFLICT, DEFAULT_ERROR_CODE);
    }

    public static ResourceAlreadyExistsException emailExists(String email) {
        return new ResourceAlreadyExistsException("User", "email", email);
    }
}