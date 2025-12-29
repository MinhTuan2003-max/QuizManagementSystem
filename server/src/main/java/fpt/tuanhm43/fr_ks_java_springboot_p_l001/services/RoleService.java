package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.role.RoleResponseDTO;
import org.springframework.data.domain.Pageable;

public interface RoleService {
    PageResponseDTO<RoleResponseDTO> findWithPaging(Pageable pageable);

    PageResponseDTO<RoleResponseDTO> searchWithPaging(String keyword, String status, Pageable pageable);
}
