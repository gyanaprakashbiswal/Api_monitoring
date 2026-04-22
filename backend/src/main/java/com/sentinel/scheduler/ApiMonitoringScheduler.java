package com.sentinel.scheduler;

import com.sentinel.entity.ApiConfig;
import com.sentinel.repository.ApiConfigRepository;
import com.sentinel.repository.ApiLogRepository;
import com.sentinel.service.ApiCheckService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ApiMonitoringScheduler {

    private static final Logger log = LoggerFactory.getLogger(ApiMonitoringScheduler.class);

    private final ApiConfigRepository apiConfigRepository;
    private final ApiLogRepository apiLogRepository;
    private final ApiCheckService apiCheckService;

    public ApiMonitoringScheduler(ApiConfigRepository apiConfigRepository, ApiLogRepository apiLogRepository, ApiCheckService apiCheckService) {
        this.apiConfigRepository = apiConfigRepository;
        this.apiLogRepository = apiLogRepository;
        this.apiCheckService = apiCheckService;
    }

    @Scheduled(fixedRate = 10000) // Runs every 10 seconds
    public void executeMonitoringCycle() {
        List<ApiConfig> activeConfigs = apiConfigRepository.findByActiveTrue();
        java.time.LocalDateTime now = java.time.LocalDateTime.now();

        for (ApiConfig config : activeConfigs) {
            // Check last log to see if it's time to run again
            apiLogRepository.findFirstByApiConfigOrderByTimestampDesc(config).ifPresentOrElse(
                lastLog -> {
                    java.time.OffsetDateTime lastTime = lastLog.getTimestamp().atOffset(java.time.ZoneOffset.UTC);
                    java.time.OffsetDateTime nextRun = lastTime.plusMinutes(config.getIntervalMinutes());
                    if (now.atOffset(java.time.ZoneOffset.UTC).isAfter(nextRun)) {
                        triggerCheck(config);
                    }
                },
                () -> triggerCheck(config) // No logs yet, run it
            );
        }
    }

    private void triggerCheck(ApiConfig config) {
        log.debug("Triggering check for API: {}", config.getName());
        apiCheckService.checkApi(config).thenAccept(result -> {
            log.trace("Completed check for {}: SUCCESS={}", config.getName(), result.getSuccessFlag());
        }).exceptionally(ex -> {
            log.error("Async check failed for {}", config.getName(), ex);
            return null;
        });
    }
}
