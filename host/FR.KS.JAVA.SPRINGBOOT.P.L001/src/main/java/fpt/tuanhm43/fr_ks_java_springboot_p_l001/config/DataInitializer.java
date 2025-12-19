package fpt.tuanhm43.fr_ks_java_springboot_p_l001.config;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Role;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.User;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.enums.RoleName;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.RoleRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            initRoles();
            initUsers();
        };
    }

    @Value("${app.admin.default-password}")
    private String adminPassword;

    @Value("${app.user.default-password}")
    private String userPassword;

    private void initRoles() {
        if (roleRepository.existsByName(RoleName.ROLE_ADMIN)) {
            Role adminRole = Role.builder()
                    .name(RoleName.ROLE_ADMIN)
                    .build();
            roleRepository.save(adminRole);
            log.info("Initialized role: {}", RoleName.ROLE_ADMIN);
        }

        if (roleRepository.existsByName(RoleName.ROLE_USER)) {
            Role userRole = Role.builder()
                    .name(RoleName.ROLE_USER)
                    .build();
            roleRepository.save(userRole);
            log.info("Initialized role: {}", RoleName.ROLE_USER);
        }
    }

    private void initUsers() {
        String adminEmail = "admin@quiz.com";
        String userEmail = "user@quiz.com";

        if (!userRepository.existsByEmail(adminEmail)) {
            Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Role ADMIN not found"));

            User admin = User.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .fullName("System Administrator")
                    .roles(Set.of(adminRole))
                    .build();
            userRepository.save(admin);
            log.info("Created default admin: {}", adminEmail);
        }

        if (!userRepository.existsByEmail(userEmail)) {
            Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role USER not found"));

            User user = User.builder()
                    .email(userEmail)
                    .password(passwordEncoder.encode(userPassword))
                    .fullName("Normal User")
                    .roles(Set.of(userRole))
                    .build();

            userRepository.save(user);
            log.info("Created default user: {}", userEmail);
        }
    }
}