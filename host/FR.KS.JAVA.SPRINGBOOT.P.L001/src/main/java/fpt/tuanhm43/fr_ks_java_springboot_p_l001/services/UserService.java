package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserResponseDTO;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface UserService {
    UserResponseDTO createUser(UserRequestDTO request);
    PageResponseDTO<UserResponseDTO> getAllUsers(Pageable pageable);
    UserResponseDTO getUserById(UUID id);
    UserResponseDTO updateUser(UUID id, UserRequestDTO request);
    void softDeleteUser(UUID id);
}