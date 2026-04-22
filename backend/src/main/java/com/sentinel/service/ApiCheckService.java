package com.sentinel.service;

import com.sentinel.entity.ApiConfig;
import com.sentinel.entity.ApiLog;
import com.sentinel.repository.ApiLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.concurrent.CompletableFuture;

@Service
public class ApiCheckService {

    private static final Logger log = LoggerFactory.getLogger(ApiCheckService.class);

    private final ApiLogRepository apiLogRepository;
    private final RestTemplate restTemplate;

    public ApiCheckService(ApiLogRepository apiLogRepository, RestTemplate restTemplate) {
        this.apiLogRepository = apiLogRepository;
        this.restTemplate = restTemplate;
    }

    @Async("apiCheckExecutor")
    public CompletableFuture<ApiLog> checkApi(ApiConfig config) {
        long startTime = System.currentTimeMillis();
        ApiLog apiLog = ApiLog.builder()
                .apiConfig(config)
                .timestamp(LocalDateTime.now())
                .build();

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "Sentinel-Zero-G/1.0");

            if (config.getHeaders() != null && !config.getHeaders().isBlank()) {
                try {
                    String[] parts = config.getHeaders().split(",");
                    for (String part : parts) {
                        String[] kv = part.split(":", 2);
                        if (kv.length == 2) {
                            headers.set(kv[0].trim(), kv[1].trim());
                        }
                    }
                } catch (Exception e) {
                    log.warn("Failed to parse headers for API {}: {}", config.getId(), e.getMessage());
                }
            }

            HttpEntity<String> entity = new HttpEntity<>(headers);
            HttpMethod method = HttpMethod.valueOf(config.getMethod() != null ? config.getMethod().toUpperCase() : "GET");

            ResponseEntity<String> response = restTemplate.exchange(
                    config.getUrl(), method, entity, String.class
            );

            long responseTime = System.currentTimeMillis() - startTime;
            boolean success = response.getStatusCode().is2xxSuccessful();

            apiLog.setResponseTimeMs(responseTime);
            apiLog.setStatusCode(response.getStatusCode().value());
            apiLog.setSuccessFlag(success);

            log.debug("API check for {} [{}] -> {}ms, status: {}, success: {}",
                    config.getName(), config.getUrl(), responseTime,
                    response.getStatusCode().value(), success);

        } catch (Exception e) {
            long responseTime = System.currentTimeMillis() - startTime;
            apiLog.setResponseTimeMs(responseTime);
            apiLog.setSuccessFlag(false);
            apiLog.setStatusCode(0);
            apiLog.setErrorMessage(e.getMessage());
            log.warn("API check failed for {} [{}]: {}", config.getName(), config.getUrl(), e.getMessage());
        }

        ApiLog saved = apiLogRepository.save(apiLog);
        return CompletableFuture.completedFuture(saved);
    }
}
