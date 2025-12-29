package fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "answers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Answer extends BaseEntity {

    @Column(nullable = false)
    private String content;

    @Column(name = "is_correct", nullable = false)
    private boolean isCorrect;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;
}