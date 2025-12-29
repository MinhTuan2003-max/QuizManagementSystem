package fpt.tuanhm43.fr_ks_java_springboot_p_l001.mappers;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.role.RoleResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "roleName", source = "name")
    RoleResponseDTO toDto(Role role);
}