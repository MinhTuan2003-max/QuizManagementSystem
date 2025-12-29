package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.submission.ResultResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.submission.SubmitRequestDTO;

public interface SubmissionService {
    ResultResponseDTO submitQuiz(SubmitRequestDTO request, String userEmail);
}