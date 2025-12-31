package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

import org.springframework.http.HttpStatus;

public class TokenRefreshException extends BaseException {
    public TokenRefreshException(String token, String message) {
        super(
                message,
                HttpStatus.FORBIDDEN,
                "AUTH_003",
                token
        );
    }
}