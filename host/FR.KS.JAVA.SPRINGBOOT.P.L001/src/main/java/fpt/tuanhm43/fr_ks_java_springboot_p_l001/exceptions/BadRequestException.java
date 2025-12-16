package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown when the request is invalid or malformed.
 */
public class BadRequestException extends BaseException {

    private static final String DEFAULT_ERROR_CODE = "BAD_REQUEST_001";

    public BadRequestException(String message) {
        super(message, HttpStatus.BAD_REQUEST, DEFAULT_ERROR_CODE);
    }
}