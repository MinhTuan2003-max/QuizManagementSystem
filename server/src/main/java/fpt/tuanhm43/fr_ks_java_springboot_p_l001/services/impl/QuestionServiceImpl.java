package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.aspect.TrackActivity;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.question.QuestionResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Answer;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.Question;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.exceptions.ResourceNotFoundException;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.mappers.QuestionMapper;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.repositories.QuestionRepository;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    @Override
    @Transactional
    @TrackActivity(value = "Create new question")
    public QuestionResponseDTO insert(QuestionRequestDTO request) {
        Question question = questionMapper.toEntity(request);
        Question saved = questionRepository.save(question);
        return questionMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<QuestionResponseDTO> getWithPaging(Pageable pageable) {
        Page<Question> page = questionRepository.findByActiveTrue(pageable);
        return PageResponseDTO.from(page.map(questionMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponseDTO<QuestionResponseDTO> searchWithPaging(String keyword, String status, Pageable pageable) {

        Specification<Question> spec = Specification.where((root, query, cb) -> cb.conjunction());

        if (keyword != null && !keyword.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("content")), "%" + keyword.toLowerCase() + "%")
            );
        }

        if ("active".equalsIgnoreCase(status)) {
            spec = spec.and((root, query, cb) -> cb.isTrue(root.get("isActive")));
        } else if ("inactive".equalsIgnoreCase(status)) {
            spec = spec.and((root, query, cb) -> cb.isFalse(root.get("isActive")));
        }

        Page<Question> page = questionRepository.findAll(spec, pageable);

        return PageResponseDTO.from(page.map(questionMapper::toSummary));
    }

    @Override
    @Transactional(readOnly = true)
    public QuestionResponseDTO getById(UUID id) {
        Question question = questionRepository.findById(id)
                .filter(Question::isActive)
                .orElseThrow(() -> ResourceNotFoundException.questionNotFound(id));

        return questionMapper.toResponse(question);
    }

    @Override
    @Transactional
    @TrackActivity(value = "Update question")
    public QuestionResponseDTO update(UUID id, QuestionRequestDTO request) {
        Question question = questionRepository.findById(id)
                .filter(Question::isActive)
                .orElseThrow(() -> ResourceNotFoundException.questionNotFound(id));

        questionMapper.updateEntity(request, question);

        question.getAnswers().clear();
        Set<Answer> newAnswers = questionMapper.toAnswerEntities(request.answers());
        newAnswers.forEach(a -> a.setQuestion(question));
        question.getAnswers().addAll(newAnswers);

        return questionMapper.toResponse(questionRepository.save(question));
    }

    @Override
    @Transactional
    @TrackActivity(value = "Soft delete question")
    public void delete(UUID id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.questionNotFound(id));

        questionRepository.softDeleteQuestion(question.getId());
    }
}
