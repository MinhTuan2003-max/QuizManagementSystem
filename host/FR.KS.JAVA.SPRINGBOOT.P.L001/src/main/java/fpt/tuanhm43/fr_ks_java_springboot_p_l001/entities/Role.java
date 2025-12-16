package fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.enums.RoleName;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private RoleName name;
}