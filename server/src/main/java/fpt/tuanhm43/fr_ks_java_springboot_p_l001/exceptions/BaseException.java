package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * Base exception class for all custom exceptions in the application.
 * Provides consistent error handling with HTTP status codes and error codes.
 */
@Getter
public abstract class BaseException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final String errorCode;
    private final transient Object[] args;

    protected BaseException(
            String message,
            HttpStatus httpStatus,
            String errorCode,
            Object... args) {

        super(message);
        this.httpStatus = httpStatus;
        this.errorCode = errorCode;
        this.args = args;
    }
}
