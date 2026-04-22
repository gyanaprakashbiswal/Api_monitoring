package com.sentinel.controller;

import com.sentinel.dto.ApiConfigRequest;
import com.sentinel.dto.ApiConfigResponse;
import com.sentinel.entity.User;
import com.sentinel.service.ApiConfigService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/configs")
public class ApiConfigController {

    private final ApiConfigService apiConfigService;

    public ApiConfigController(ApiConfigService apiConfigService) {
        this.apiConfigService = apiConfigService;
    }

    @GetMapping
    public ResponseEntity<List<ApiConfigResponse>> getUserConfigs(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(apiConfigService.getUserApis(user));
    }

    @PostMapping
    public ResponseEntity<ApiConfigResponse> createConfig(
            @Valid @RequestBody ApiConfigRequest request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(apiConfigService.createApi(request, user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiConfigResponse> updateConfig(
            @PathVariable Long id,
            @RequestBody ApiConfigRequest request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(apiConfigService.updateApi(id, request, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConfig(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        apiConfigService.deleteApi(id, user);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<ApiConfigResponse> toggleConfig(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(apiConfigService.toggleApi(id, user));
    }
}
