package fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.QuizSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface QuizSubmissionRepository extends JpaRepository<QuizSubmission, UUID> {
}