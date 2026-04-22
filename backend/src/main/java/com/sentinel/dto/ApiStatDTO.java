package com.sentinel.dto;

import java.util.List;

public class ApiStatDTO {
    private Long id;
    private String name;
    private String url;
    private String method;
    private Boolean active;
    private Boolean lastSuccessFlag;
    private Long lastResponseTimeMs;
    private Integer lastStatusCode;
    private Long consecutiveFailures;
    private Boolean criticalAlert;
    private List<ApiLogDTO> recentLogs;

    public ApiStatDTO(Long id, String name, String url, String method, Boolean active, Boolean lastSuccessFlag, Long lastResponseTimeMs, Integer lastStatusCode, Long consecutiveFailures, Boolean criticalAlert, List<ApiLogDTO> recentLogs) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.method = method;
        this.active = active;
        this.lastSuccessFlag = lastSuccessFlag;
        this.lastResponseTimeMs = lastResponseTimeMs;
        this.lastStatusCode = lastStatusCode;
        this.consecutiveFailures = consecutiveFailures;
        this.criticalAlert = criticalAlert;
        this.recentLogs = recentLogs;
    }

    public static ApiStatDTOBuilder builder() { return new ApiStatDTOBuilder(); }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getUrl() { return url; }
    public String getMethod() { return method; }
    public Boolean getActive() { return active; }
    public Boolean getLastSuccessFlag() { return lastSuccessFlag; }
    public Long getLastResponseTimeMs() { return lastResponseTimeMs; }
    public Integer getLastStatusCode() { return lastStatusCode; }
    public Long getConsecutiveFailures() { return consecutiveFailures; }
    public Boolean getCriticalAlert() { return criticalAlert; }
    public List<ApiLogDTO> getRecentLogs() { return recentLogs; }

    public static class ApiStatDTOBuilder {
        private Long id;
        private String name;
        private String url;
        private String method;
        private Boolean active;
        private Boolean lastSuccessFlag;
        private Long lastResponseTimeMs;
        private Integer lastStatusCode;
        private Long consecutiveFailures;
        private Boolean criticalAlert;
        private List<ApiLogDTO> recentLogs;

        public ApiStatDTOBuilder id(Long id) { this.id = id; return this; }
        public ApiStatDTOBuilder name(String name) { this.name = name; return this; }
        public ApiStatDTOBuilder url(String url) { this.url = url; return this; }
        public ApiStatDTOBuilder method(String method) { this.method = method; return this; }
        public ApiStatDTOBuilder active(Boolean active) { this.active = active; return this; }
        public ApiStatDTOBuilder lastSuccessFlag(Boolean lastSuccessFlag) { this.lastSuccessFlag = lastSuccessFlag; return this; }
        public ApiStatDTOBuilder lastResponseTimeMs(Long lastResponseTimeMs) { this.lastResponseTimeMs = lastResponseTimeMs; return this; }
        public ApiStatDTOBuilder lastStatusCode(Integer lastStatusCode) { this.lastStatusCode = lastStatusCode; return this; }
        public ApiStatDTOBuilder consecutiveFailures(Long consecutiveFailures) { this.consecutiveFailures = consecutiveFailures; return this; }
        public ApiStatDTOBuilder criticalAlert(Boolean criticalAlert) { this.criticalAlert = criticalAlert; return this; }
        public ApiStatDTOBuilder recentLogs(List<ApiLogDTO> recentLogs) { this.recentLogs = recentLogs; return this; }

        public ApiStatDTO build() {
            return new ApiStatDTO(id, name, url, method, active, lastSuccessFlag, lastResponseTimeMs, lastStatusCode, consecutiveFailures, criticalAlert, recentLogs);
        }
    }
}
