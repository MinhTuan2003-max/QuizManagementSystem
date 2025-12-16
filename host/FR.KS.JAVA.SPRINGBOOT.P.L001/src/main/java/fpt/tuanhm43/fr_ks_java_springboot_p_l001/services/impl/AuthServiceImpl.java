package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth.AuthResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth.LoginRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth.RegisterRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Role;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.User;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.enums.RoleName;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.BadRequestException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceNotFoundException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.RoleRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.UserRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.AuthService;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @Override
    public AuthResponseDTO login(LoginRequestDTO request) {
        // 1. Authenticate user using Spring Security Manager
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        // 2. Retrieve User entity
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.isActive()) {
            throw new BadRequestException("User account is inactive");
        }

        // 3. Generate JWT Token
        Set<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());

        String token = tokenService.generateToken(user, roles);

        // 4. Return Response
        return new AuthResponseDTO(token, user.getEmail(), roles.iterator().next());
    }

    @Override
    @Transactional
    public void register(RegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already exists");
        }

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException("Role USER not found"));

        User newUser = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .fullName(request.fullName())
                .roles(Set.of(userRole))
                .build();
        // active = true mặc định trong BaseEntity

        userRepository.save(newUser);
    }
}