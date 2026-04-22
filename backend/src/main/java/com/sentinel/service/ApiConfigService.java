package com.sentinel.service;

import com.sentinel.dto.ApiConfigRequest;
import com.sentinel.dto.ApiConfigResponse;
import com.sentinel.entity.ApiConfig;
import com.sentinel.entity.User;
import com.sentinel.repository.ApiConfigRepository;
import com.sentinel.repository.ApiLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApiConfigService {

    private final ApiConfigRepository apiConfigRepository;
 
    public ApiConfigService(ApiConfigRepository apiConfigRepository) {
        this.apiConfigRepository = apiConfigRepository;
    }

    public List<ApiConfigResponse> getUserApis(User user) {
        return apiConfigRepository.findByUser(user).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public ApiConfigResponse createApi(ApiConfigRequest request, User user) {
        var config = ApiConfig.builder()
                .name(request.getName())
                .url(request.getUrl())
                .method(request.getMethod() != null ? request.getMethod() : "GET")
                .headers(request.getHeaders())
                .intervalMinutes(request.getIntervalMinutes() != null ? request.getIntervalMinutes() : 1)
                .timeoutSeconds(request.getTimeoutSeconds() != null ? request.getTimeoutSeconds() : 10)
                .active(true)
                .user(user)
                .build();
        return toResponse(apiConfigRepository.save(config));
    }

    public ApiConfigResponse updateApi(Long id, ApiConfigRequest request, User user) {
        var config = apiConfigRepository.findById(id)
                .filter(c -> c.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("API config not found or unauthorized"));
        if (request.getName() != null) config.setName(request.getName());
        if (request.getUrl() != null) config.setUrl(request.getUrl());
        if (request.getMethod() != null) config.setMethod(request.getMethod());
        if (request.getHeaders() != null) config.setHeaders(request.getHeaders());
        if (request.getIntervalMinutes() != null) config.setIntervalMinutes(request.getIntervalMinutes());
        if (request.getTimeoutSeconds() != null) config.setTimeoutSeconds(request.getTimeoutSeconds());
        return toResponse(apiConfigRepository.save(config));
    }

    @Transactional
    public void deleteApi(Long id, User user) {
        var config = apiConfigRepository.findById(id)
                .filter(c -> c.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("API config not found or unauthorized"));
        apiConfigRepository.delete(config);
    }

    @Transactional
    public ApiConfigResponse toggleApi(Long id, User user) {
        var config = apiConfigRepository.findById(id)
                .filter(c -> c.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("API config not found or unauthorized"));
        config.setActive(!config.getActive());
        return toResponse(apiConfigRepository.save(config));
    }

    private ApiConfigResponse toResponse(ApiConfig config) {
        return ApiConfigResponse.builder()
                .id(config.getId())
                .name(config.getName())
                .url(config.getUrl())
                .method(config.getMethod())
                .headers(config.getHeaders())
                .intervalMinutes(config.getIntervalMinutes())
                .timeoutSeconds(config.getTimeoutSeconds())
                .active(config.getActive())
                .build();
    }
}
