package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

import org.springframework.http.HttpStatus;

/**
 * Exception for forbidden access (403).
 */
public class ForbiddenException extends BaseException {

    private static final String ERROR_CODE = "AUTH_003";

    public ForbiddenException(String message) {
        super(message, HttpStatus.FORBIDDEN, ERROR_CODE);
    }

    public static ForbiddenException accessDenied() {
        return new ForbiddenException("You do not have permission to access this resource");
    }
}