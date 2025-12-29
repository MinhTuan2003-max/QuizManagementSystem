package fpt.tuanhm43.fr_ks_java_springboot_p_l001.aspect;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class SecurityLoggingAspect {

    // Pointcut hướng đến phương thức parse token trong TokenService
    @Around("execution(* fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.impl.TokenServiceImpl.getAuthenticationFromToken(..))")
    public Object handleJwtLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            Object result = joinPoint.proceed();

            if (result != null) {
                Authentication auth = (Authentication) result;
                log.debug("JWT: Access granted for user: {}", auth.getName());
            }
            return result;

        } catch (ExpiredJwtException e) {
            log.warn("AUTH_WARN | JWT token has expired: {}", e.getMessage());
            return null;
        } catch (JwtException e) {
            log.warn("AUTH_WARN | Invalid JWT signature/claims: {}", e.getMessage());
            return null;
        } catch (Exception e) {
            log.error("AUTH_ERROR | Unexpected security error: ", e);
            return null;
        }
    }
}