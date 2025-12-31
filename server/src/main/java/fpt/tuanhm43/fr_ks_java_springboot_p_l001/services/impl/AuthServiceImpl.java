package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.aspect.TrackActivity;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth.*;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.RefreshToken;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Role;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.User;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.enums.RoleName;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.AuthenticationException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceAlreadyExistsException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceNotFoundException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.TokenRefreshException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.RoleRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.UserRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.AuthService;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.RefreshTokenService;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.TokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final RefreshTokenService refreshTokenService;

    @Override
    @Transactional
    public AuthResponseDTO login(LoginRequestDTO request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );

            User user = userRepository.findByEmail(request.email())
                    .orElseThrow(AuthenticationException::invalidCredentials);

            if (!user.isActive()) {
                throw AuthenticationException.accountDisabled();
            }

            Set<String> roles = user.getRoles().stream()
                    .map(role -> role.getName().name())
                    .collect(Collectors.toSet());

            String accessToken = tokenService.generateToken(user, roles);

            RefreshToken refreshToken = refreshTokenService.create(user);

            String primaryRole = user.getRoles().stream()
                    .map(r -> r.getName().name())
                    .sorted()
                    .findFirst()
                    .orElse("");

            return new AuthResponseDTO(accessToken, refreshToken.getToken(), user.getEmail(), primaryRole);

        } catch (BadCredentialsException e) {
            log.warn("Login failed for email: {}", request.email());
            throw AuthenticationException.invalidCredentials();
        }
    }

    @Override
    @Transactional
    @TrackActivity(value = "Register new user")
    public void register(RegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.email())) {
            throw ResourceAlreadyExistsException.emailExists(request.email());
        }

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> ResourceNotFoundException.roleNotFound(RoleName.ROLE_USER.name()));

        User newUser = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .fullName(request.fullName())
                .roles(Set.of(userRole))
                .build();

        userRepository.save(newUser);
    }

    @Override
    @Transactional
    public TokenRefreshResponseDTO refreshToken(TokenRefreshRequestDTO request) {
        return refreshTokenService.findByToken(request.refreshToken())
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    Set<String> roles = user.getRoles().stream()
                            .map(role -> role.getName().name())
                            .collect(Collectors.toSet());

                    String accessToken = tokenService.generateToken(user, roles);

                    return new TokenRefreshResponseDTO(accessToken, request.refreshToken());
                })
                .orElseThrow(() -> new TokenRefreshException(request.refreshToken(), "Refresh token is not in database!"));
    }
}