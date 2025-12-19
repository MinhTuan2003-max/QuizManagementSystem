package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown when attempting to create a resource that already exists.
 */
public class ResourceAlreadyExistsException extends BaseException {

    private static final String DEFAULT_ERROR_CODE = "CONFLICT_001";
    private static final String MESSAGE_KEY = "error.resource.already_exists";

    public ResourceAlreadyExistsException(String resourceName, String fieldName, Object fieldValue) {
        super(MESSAGE_KEY, HttpStatus.CONFLICT, DEFAULT_ERROR_CODE, resourceName, fieldName, fieldValue);
    }

    public static ResourceAlreadyExistsException emailExists(String email) {
        return new ResourceAlreadyExistsException("User", "email", email);
    }
}