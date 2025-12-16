package fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}