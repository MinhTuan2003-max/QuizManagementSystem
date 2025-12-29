package fpt.tuanhm43.fr_ks_java_springboot_p_l001.constants;

public final class AppConstants {

    private AppConstants() {
        // Prevent instantiation
    }

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String AUTHORIZATION_HEADER = "Authorization";

    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    public static final String FEEDBACK_PASSED = "PASSED";
    public static final String FEEDBACK_FAILED = "FAILED";
}