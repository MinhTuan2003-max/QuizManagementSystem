package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserResponseDTO;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface UserService {
    // Tạo user mới (Dành cho Admin, khác với Register tự đăng ký)
    UserResponseDTO createUser(UserRequestDTO request);

    // Lấy danh sách user (có phân trang)
    PageResponseDTO<UserResponseDTO> getAllUsers(Pageable pageable);

    // Lấy chi tiết user
    UserResponseDTO getUserById(UUID id);

    // Cập nhật thông tin user
    UserResponseDTO updateUser(UUID id, UserRequestDTO request);

    // Xóa mềm user
    void deleteUser(UUID id);
}