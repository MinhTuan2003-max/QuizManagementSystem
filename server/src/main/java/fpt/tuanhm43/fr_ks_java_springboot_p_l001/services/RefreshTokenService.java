package fpt.tuanhm43.fr_ks_java_springboot_p_l001.services;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.RefreshToken;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.entities.User;

public interface RefreshTokenService {
     RefreshToken create(User user);
}
