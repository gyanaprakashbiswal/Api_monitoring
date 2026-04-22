package com.sentinel.service;

import com.sentinel.dto.ApiLogDTO;
import com.sentinel.dto.ApiStatDTO;
import com.sentinel.dto.DashboardStatsDTO;
import com.sentinel.entity.ApiConfig;
import com.sentinel.entity.ApiLog;
import com.sentinel.entity.User;
import com.sentinel.repository.ApiConfigRepository;
import com.sentinel.repository.ApiLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final ApiConfigRepository apiConfigRepository;
    private final ApiLogRepository apiLogRepository;

    public DashboardService(ApiConfigRepository apiConfigRepository, ApiLogRepository apiLogRepository) {
        this.apiConfigRepository = apiConfigRepository;
        this.apiLogRepository = apiLogRepository;
    }

    public DashboardStatsDTO getDashboardStats(User user) {
        List<ApiConfig> apis = apiConfigRepository.findByUser(user);

        List<ApiStatDTO> stats = apis.stream()
                .map(this::buildApiStat)
                .collect(Collectors.toList());

        long healthy = stats.stream().filter(s -> Boolean.TRUE.equals(s.getLastSuccessFlag())).count();
        long failing = stats.stream().filter(s -> Boolean.FALSE.equals(s.getLastSuccessFlag())).count();
        long critical = stats.stream().filter(s -> Boolean.TRUE.equals(s.getCriticalAlert())).count();

        return DashboardStatsDTO.builder()
                .totalApis((long) apis.size())
                .healthyApis(healthy)
                .failingApis(failing)
                .criticalApis(critical)
                .apiStats(stats)
                .build();
    }

    private ApiStatDTO buildApiStat(ApiConfig config) {
        List<ApiLog> recentLogs = apiLogRepository.findTop10ByApiConfigOrderByTimestampDesc(config);
        ApiLog latest = recentLogs.isEmpty() ? null : recentLogs.get(0);

        long consecutiveFailures = 0;
        for (ApiLog log : recentLogs) {
            if (Boolean.FALSE.equals(log.getSuccessFlag())) {
                consecutiveFailures++;
            } else {
                break;
            }
        }

        boolean criticalAlert = consecutiveFailures >= 3;

        List<ApiLogDTO> logDTOs = recentLogs.stream()
                .map(this::toLogDTO)
                .collect(Collectors.toList());

        return ApiStatDTO.builder()
                .id(config.getId())
                .name(config.getName())
                .url(config.getUrl())
                .method(config.getMethod())
                .active(config.getActive())
                .lastSuccessFlag(latest != null ? latest.getSuccessFlag() : null)
                .lastResponseTimeMs(latest != null ? latest.getResponseTimeMs() : null)
                .lastStatusCode(latest != null ? latest.getStatusCode() : null)
                .consecutiveFailures(consecutiveFailures)
                .criticalAlert(criticalAlert)
                .recentLogs(logDTOs)
                .build();
    }

    private ApiLogDTO toLogDTO(ApiLog log) {
        return ApiLogDTO.builder()
                .id(log.getId())
                .responseTimeMs(log.getResponseTimeMs())
                .statusCode(log.getStatusCode())
                .successFlag(log.getSuccessFlag())
                .errorMessage(log.getErrorMessage())
                .timestamp(log.getTimestamp())
                .build();
    }
}
