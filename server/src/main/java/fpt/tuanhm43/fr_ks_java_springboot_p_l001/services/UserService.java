package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserResponseDTO;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface UserService {
    UserResponseDTO insert(UserRequestDTO request);

    PageResponseDTO<UserResponseDTO> findWithPaging(Pageable pageable);

    PageResponseDTO<UserResponseDTO> searchWithPaging(String keyword, String status, Pageable pageable);

    UserResponseDTO findById(UUID id);

    UserResponseDTO update(UUID id, UserRequestDTO request);

    void delete(UUID id);
}