package fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {
    Page<Question> findByActiveTrue(Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE Question q SET q.active = false WHERE q.id = :id")
    void softDeleteQuestion(UUID id);
}