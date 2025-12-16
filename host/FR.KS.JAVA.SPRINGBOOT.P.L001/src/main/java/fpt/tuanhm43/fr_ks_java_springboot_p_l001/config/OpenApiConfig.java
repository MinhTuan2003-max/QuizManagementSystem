package fpt.tuanhm43.fr_ks_java_springboot_p_l001.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Quiz Application API",
                version = "1.0",
                description = "RESTful API for Online Quiz System",
                contact = @Contact(name = "TuanHM43", email = "tuanhm43@fpt.com"),
                license = @License(name = "MIT License", url = "https://opensource.org/licenses/MIT")
        ),
        servers = {@Server(url = "http://localhost:8080", description = "Local Development Server")}
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT",
        description = "Enter JWT token. Example: 'eyJhbGci...'"
)
public class OpenApiConfig {

    /**
     * Bean này sẽ tự động thêm các response lỗi chuẩn vào TẤT CẢ các API trong Swagger
     */
    @Bean
    public OpenApiCustomizer customerGlobalHeaderOpenApiCustomizer() {
        return openApi -> openApi.getPaths().values().forEach(pathItem -> pathItem.readOperations().forEach(operation -> {
            ApiResponses apiResponses = operation.getResponses();

            // 401 Unauthorized
            apiResponses.addApiResponse("401", createApiResponse("Unauthorized", 401, "Please login first", "AUTH_001"));

            // 403 Forbidden
            apiResponses.addApiResponse("403", createApiResponse("Forbidden", 403, "Access Denied", "AUTH_003"));

            // 409 Conflict
            apiResponses.addApiResponse("409", createApiResponse("Conflict", 409, "Resource already exists", "CONFLICT_001"));

            // 422 Unprocessable Entity (Validation Failed)
            apiResponses.addApiResponse("422", createValidationApiResponse());

            // 500 Internal Server Error
            apiResponses.addApiResponse("500", createApiResponse("Internal Server Error", 500, "An unexpected error occurred", "INTERNAL_SERVER_ERROR"));
        }));
    }

    private ApiResponse createApiResponse(String description, int status, String message, String errorCode) {
        String example = String.format("""
            {
              "timestamp": "%s",
              "status": %d,
              "message": "%s",
              "data": null,
              "errors": {
                "errorCode": "%s"
              }
            }
            """, LocalDateTime.now(), status, message, errorCode);

        return new ApiResponse()
                .description(description)
                .content(new Content().addMediaType(org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
                        new MediaType().example(example)));
    }

    private ApiResponse createValidationApiResponse() {
        String example = String.format("""
            {
              "timestamp": "%s",
              "status": 422,
              "message": "Validation Failed",
              "data": null,
              "errors": {
                "email": "Email format is invalid",
                "password": "Password must be strong"
              }
            }
            """, LocalDateTime.now());

        return new ApiResponse()
                .description("Unprocessable Entity (Validation Failed)")
                .content(new Content().addMediaType(org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
                        new MediaType().example(example)));
    }
}