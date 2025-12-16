package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth.AuthResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth.LoginRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.auth.RegisterRequestDTO;

public interface AuthService {
    AuthResponseDTO login(LoginRequestDTO request);
    void register(RegisterRequestDTO request);
}