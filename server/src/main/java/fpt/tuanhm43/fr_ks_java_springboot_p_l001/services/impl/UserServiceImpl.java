package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.aspect.TrackActivity;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Role;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.User;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.enums.RoleName;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceAlreadyExistsException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceNotFoundException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.mappers.UserMapper;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.RoleRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.UserRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String STATUS_ACTIVE = "active";
    private static final String STATUS_INACTIVE = "inactive";
    private static final String FIELD_ACTIVE = "active";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    @Transactional
    @TrackActivity(value = "Create new user")
    public UserResponseDTO insert(UserRequestDTO request) {
        if (userRepository.existsByEmail(request.email())) {
            throw ResourceAlreadyExistsException.emailExists(request.email());
        }

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException("Default Role USER not found"));

        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRoles(Set.of(userRole));

        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<UserResponseDTO> findWithPaging(Pageable pageable) {
        Page<User> page = userRepository.findByActiveTrue(pageable);
        return PageResponseDTO.from(page.map(userMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<UserResponseDTO> searchWithPaging(String keyword, String status, Pageable pageable) {
        Specification<User> spec = Specification.where((root, query, cb) -> cb.conjunction());

        if (keyword != null && !keyword.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.or(
                    cb.like(cb.lower(root.get("email")), "%" + keyword.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("fullName")), "%" + keyword.toLowerCase() + "%")
            ));
        }

        if (STATUS_ACTIVE.equalsIgnoreCase(status)) {
            spec = spec.and((root, query, cb) -> cb.isTrue(root.get(FIELD_ACTIVE)));
        } else if (STATUS_INACTIVE.equalsIgnoreCase(status)) {
            spec = spec.and((root, query, cb) -> cb.isFalse(root.get(FIELD_ACTIVE)));
        }

        Page<User> page = userRepository.findAll(spec, pageable);
        return PageResponseDTO.from(page.map(userMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO findById(UUID id) {
        return userRepository.findById(id)
                .map(userMapper::toResponse)
                .orElseThrow(() -> ResourceNotFoundException.userNotFoundById(id));
    }

    @Override
    @Transactional
    @TrackActivity(value = "Update user info")
    public UserResponseDTO update(UUID id, UserRequestDTO request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.userNotFoundById(id));

        if (!user.getEmail().equals(request.email()) && userRepository.existsByEmail(request.email())) {
            throw ResourceAlreadyExistsException.emailExists(request.email());
        }

        userMapper.updateEntity(request, user);

        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }

        return userMapper.toResponse(userRepository.save(user));
    }

    @Override
    @Transactional
    @TrackActivity(value = "Soft delete user")
    public void delete(UUID id) {
        if (!userRepository.existsById(id)) {
            throw ResourceNotFoundException.userNotFoundById(id);
        }
        userRepository.softDeleteUser(id);
    }
}