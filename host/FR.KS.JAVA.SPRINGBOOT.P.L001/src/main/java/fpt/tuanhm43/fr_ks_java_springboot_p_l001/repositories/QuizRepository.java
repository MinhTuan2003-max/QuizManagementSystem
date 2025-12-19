package fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, UUID> {
    @EntityGraph(attributePaths = {"questions", "questions.answers"})
    Optional<Quiz> findDetailById(UUID id);
    Page<Quiz> findByActiveTrue(Pageable pageable);
    Page<Quiz> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE Quiz q SET q.active = false WHERE q.id = :id")
    void softDeleteQuiz(UUID id);
}