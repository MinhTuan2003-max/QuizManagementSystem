package fpt.tuanhm43.fr_ks_java_springboot_p_l001.utils;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

class StrongPasswordValidator implements ConstraintValidator<StrongPassword, String> {

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) return false;
        // Regex: Min 8 chars, 1 Upper, 1 Lower, 1 Digit, 1 Special (!@#$%^&*)
        return password.matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&(){}:;',?/*~$^+=<>]).{8,}$");
    }
}