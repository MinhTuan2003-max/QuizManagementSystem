package fpt.tuanhm43.fr_ks_java_springboot_p_l001.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class UnifiedLoggingAspect {
    // Log cho các hành động thành công (Login, Create, Update...)
    @Around("@annotation(trackActivity)")
    public Object logActivity(ProceedingJoinPoint joinPoint, TrackActivity trackActivity) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        String action = trackActivity.value();

        try {
            Object result = joinPoint.proceed();
            // Log thành công
            log.info("SUCCESS | Action: {} | Method: {} | Identifier: {}",
                    action, methodName, (args.length > 0 ? args[0] : "N/A"));
            return result;
        } catch (Throwable e) {
            // Log thất bại khi có lỗi xảy ra trong method
            log.error("FAILED | Action: {} | Method: {} | Reason: {}",
                    action, methodName, e.getMessage());
            throw e;
        }
    }

    // Log tự động cho toàn bộ tầng Controller (để theo dõi luồng gọi API)
    @Before("within(fpt.tuanhm43.fr_ks_java_springboot_p_l001.controllers.*)")
    public void logControllerAccess(JoinPoint joinPoint) {
        log.debug("API Call: {} started", joinPoint.getSignature().toShortString());
    }
}
