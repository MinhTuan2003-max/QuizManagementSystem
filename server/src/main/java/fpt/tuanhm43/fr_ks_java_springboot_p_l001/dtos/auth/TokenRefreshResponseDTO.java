package fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth;

public record TokenRefreshResponseDTO(
        String accessToken,
        String refreshToken,
        String tokenType
) {
    public TokenRefreshResponseDTO(String accessToken, String refreshToken) {
        this(accessToken, refreshToken, "Bearer");
    }
}