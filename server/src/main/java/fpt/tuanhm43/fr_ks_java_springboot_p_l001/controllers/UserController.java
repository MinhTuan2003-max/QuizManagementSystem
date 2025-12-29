package fpt.tuanhm43.fr_ks_java_springboot_p_l001.controllers;

import fpt.tuanhm43.fr_ks_java_springboot_p_l001.constants.AppConstants;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.ApiResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.PageResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserRequestDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.dtos.user.UserResponseDTO;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.services.UserService;
import fpt.tuanhm43.fr_ks_java_springboot_p_l001.utils.helper.ValidateSortField;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static org.hibernate.dialect.SybaseASEDialect.MAX_PAGE_SIZE;
import static org.springframework.beans.support.PagedListHolder.DEFAULT_PAGE_SIZE;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "User Management", description = "APIs for managing users (Admin only)")
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('" + AppConstants.ROLE_ADMIN + "')")
public class UserController {

    private final UserService userService;

    @PostMapping
    @Operation(summary = "Create new user")
    public ResponseEntity<ApiResponseDTO<UserResponseDTO>> createUser(@Valid @RequestBody UserRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.created(userService.insert(request), "User created successfully"));
    }

    @GetMapping
    @Operation(summary = "Get all users")
    public ResponseEntity<ApiResponseDTO<PageResponseDTO<UserResponseDTO>>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        size = Math.min(size, MAX_PAGE_SIZE);
        if (size <= 0) size = DEFAULT_PAGE_SIZE;

        String validSortBy = ValidateSortField.validate(
                sortBy, "email", "fullName", "createdAt"
        );

        Sort sort = sortDir.equalsIgnoreCase("asc")
                ? Sort.by(validSortBy).ascending()
                : Sort.by(validSortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        PageResponseDTO<UserResponseDTO> result = userService.findWithPaging(pageable);

        return ResponseEntity.ok(
                ApiResponseDTO.success(result, "Users retrieved successfully")
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user details")
    public ResponseEntity<ApiResponseDTO<UserResponseDTO>> getUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponseDTO.success(userService.findById(id)));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update user info")
    public ResponseEntity<ApiResponseDTO<UserResponseDTO>> updateUser(
            @PathVariable UUID id,
            @Valid @RequestBody UserRequestDTO request) {
        return ResponseEntity.ok(ApiResponseDTO.success(userService.update(id, request), "User updated successfully"));
    }

    @PostMapping("/search")
    @Operation(summary = "Search users by keyword and status")
    public ResponseEntity<ApiResponseDTO<PageResponseDTO<UserResponseDTO>>> searchUsers(
            @RequestParam String keyword,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String order
    ) {
        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(ApiResponseDTO.success(userService.searchWithPaging(keyword, status, pageable)));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete (Soft) user")
    public ResponseEntity<ApiResponseDTO<Void>> deleteUser(@PathVariable UUID id) {
        userService.delete(id);
        return ResponseEntity.ok(ApiResponseDTO.success(null, "User deleted successfully"));
    }
}