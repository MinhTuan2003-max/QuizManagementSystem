package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown when authentication fails.
 */
public class AuthenticationException extends BaseException {

    private static final String DEFAULT_ERROR_CODE = "AUTH_001";

    public AuthenticationException(String message) {
        super(message, HttpStatus.UNAUTHORIZED, DEFAULT_ERROR_CODE);
    }

    public static AuthenticationException invalidCredentials() {
        return new AuthenticationException("error.auth.invalid_credentials");
    }

    public static AuthenticationException accountDisabled() {
        return new AuthenticationException("error.auth.account_disabled");
    }
}