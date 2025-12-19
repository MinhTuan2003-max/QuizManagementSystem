package fpt.tuanhm43.fr_ks_java_springboot_p_l001.utils;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = StrongPasswordValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface StrongPassword {
    String message() default "{validation.password.strong}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}