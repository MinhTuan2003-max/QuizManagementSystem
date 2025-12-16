package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}