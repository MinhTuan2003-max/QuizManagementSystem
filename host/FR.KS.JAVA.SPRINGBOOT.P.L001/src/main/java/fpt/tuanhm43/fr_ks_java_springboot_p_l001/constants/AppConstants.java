package fpt.tuanhm43.fr_ks_java_springboot_p_l001.constants;

public final class AppConstants {

    private AppConstants() {
        // Prevent instantiation
    }

    // Auth Constants
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String AUTHORIZATION_HEADER = "Authorization";

    // Role Names (String representation for Security Config)
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_USER = "ROLE_USER";
}