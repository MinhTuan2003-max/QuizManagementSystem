package fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.enums.QuestionType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question extends BaseEntity {

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type;

    @Min(0)
    @Column(nullable = false)
    private Integer score;

    @ManyToMany(mappedBy = "questions")
    @Builder.Default
    private Set<Quiz> quizzes = new HashSet<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Answer> answers = new HashSet<>();
}