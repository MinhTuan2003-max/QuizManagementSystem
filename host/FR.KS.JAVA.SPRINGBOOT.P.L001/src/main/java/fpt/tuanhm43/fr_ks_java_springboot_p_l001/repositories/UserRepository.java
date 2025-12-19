package fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Page<User> findByActiveTrue(Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.active = false WHERE u.id = :id")
    void softDeleteUser(UUID id);
}