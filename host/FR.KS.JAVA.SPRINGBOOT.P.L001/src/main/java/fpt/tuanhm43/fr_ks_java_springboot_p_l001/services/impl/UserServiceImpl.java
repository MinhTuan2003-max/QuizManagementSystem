package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Role;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.User;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.enums.RoleName;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.BadRequestException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceNotFoundException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.RoleRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.UserRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserResponseDTO createUser(UserRequestDTO request) {
        // 1. Validate Email
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already exists");
        }

        // 2. Fetch Default Role (ROLE_USER)
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException("Default Role USER not found"));

        // 3. Map DTO -> Entity
        User user = User.builder()
                .email(request.email())
                .fullName(request.fullName())
                .password(passwordEncoder.encode(request.password()))
                .roles(Set.of(userRole))
                .build();
        // active = true mặc định

        // 4. Save & Return
        User savedUser = userRepository.save(user);
        log.info("Created user with ID: {}", savedUser.getId());

        return mapToResponse(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<UserResponseDTO> getAllUsers(Pageable pageable) {
        // Lấy tất cả user (bao gồm cả active và inactive để Admin quản lý)
        // Nếu muốn chỉ lấy active thì dùng hàm findByActiveTrue tương tự Question
        Page<User> page = userRepository.findAll(pageable);

        return PageResponseDTO.from(page.map(this::mapToResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapToResponse(user);
    }

    @Override
    @Transactional
    public UserResponseDTO updateUser(UUID id, UserRequestDTO request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Check xem email mới có trùng với user KHÁC không
        if (!user.getEmail().equals(request.email()) && userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already in use by another user");
        }

        // Update fields
        user.setFullName(request.fullName());
        user.setEmail(request.email());

        // Nếu có gửi password mới thì encode lại, nếu không thì giữ nguyên (tuỳ logic FE)
        // Ở đây giả định request luôn gửi password (vì @NotBlank),
        // thực tế nên tách API đổi pass riêng hoặc check null/empty.
        // Theo DTO hiện tại thì password là bắt buộc:
        user.setPassword(passwordEncoder.encode(request.password()));

        User updatedUser = userRepository.save(user);
        log.info("Updated user ID: {}", id);

        return mapToResponse(updatedUser);
    }

    @Override
    @Transactional
    public void deleteUser(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Soft delete
        user.setActive(false);
        userRepository.save(user);
        log.info("Soft deleted user ID: {}", id);
    }

    // Helper: Map Entity -> Record
    private UserResponseDTO mapToResponse(User user) {
        Set<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());

        return new UserResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                roles,
                user.isActive(),
                user.getCreatedAt()
        );
    }
}