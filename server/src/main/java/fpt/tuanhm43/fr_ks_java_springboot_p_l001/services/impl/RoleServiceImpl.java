package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.role.RoleResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Role;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.mappers.RoleMapper;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.RoleRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<RoleResponseDTO> findWithPaging(Pageable pageable) {
        Page<Role> page = roleRepository.findAll(pageable);
        return PageResponseDTO.from(page.map(roleMapper::toDto));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<RoleResponseDTO> searchWithPaging(String keyword, String status, Pageable pageable) {
        Specification<Role> spec = Specification.where((root, query, cb) -> cb.conjunction());

        if (keyword != null && !keyword.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("name").as(String.class)), "%" + keyword.toLowerCase() + "%")
            );
        }

        if ("active".equalsIgnoreCase(status)) {
            spec = spec.and((root, query, cb) -> cb.isTrue(root.get("isActive")));
        } else if ("inactive".equalsIgnoreCase(status)) {
            spec = spec.and((root, query, cb) -> cb.isFalse(root.get("isActive")));
        }

        Page<Role> page = roleRepository.findAll(spec, pageable);
        return PageResponseDTO.from(page.map(roleMapper::toDto));
    }
}