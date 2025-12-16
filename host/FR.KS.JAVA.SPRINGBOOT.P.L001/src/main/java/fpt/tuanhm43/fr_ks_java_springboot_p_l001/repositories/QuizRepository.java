package fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Quiz;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, UUID> {

    @EntityGraph(attributePaths = {"questions", "questions.answers"})
    Optional<Quiz> findDetailById(UUID id);
}