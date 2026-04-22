package com.sentinel.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "api_logs")
public class ApiLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id", nullable = false)
    private ApiConfig apiConfig;

    @Column(nullable = false)
    private Long responseTimeMs;

    private Integer statusCode;

    @Column(nullable = false)
    private Boolean successFlag;

    private String errorMessage;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    public ApiLog() {}

    public ApiLog(Long id, ApiConfig apiConfig, Long responseTimeMs, Integer statusCode, Boolean successFlag, String errorMessage, LocalDateTime timestamp) {
        this.id = id;
        this.apiConfig = apiConfig;
        this.responseTimeMs = responseTimeMs;
        this.statusCode = statusCode;
        this.successFlag = successFlag;
        this.errorMessage = errorMessage;
        this.timestamp = timestamp;
    }

    public static ApiLogBuilder builder() { return new ApiLogBuilder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public ApiConfig getApiConfig() { return apiConfig; }
    public void setApiConfig(ApiConfig apiConfig) { this.apiConfig = apiConfig; }
    public Long getResponseTimeMs() { return responseTimeMs; }
    public void setResponseTimeMs(Long responseTimeMs) { this.responseTimeMs = responseTimeMs; }
    public Integer getStatusCode() { return statusCode; }
    public void setStatusCode(Integer statusCode) { this.statusCode = statusCode; }
    public Boolean getSuccessFlag() { return successFlag; }
    public void setSuccessFlag(Boolean successFlag) { this.successFlag = successFlag; }
    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public static class ApiLogBuilder {
        private Long id;
        private ApiConfig apiConfig;
        private Long responseTimeMs;
        private Integer statusCode;
        private Boolean successFlag;
        private String errorMessage;
        private LocalDateTime timestamp = LocalDateTime.now();

        public ApiLogBuilder id(Long id) { this.id = id; return this; }
        public ApiLogBuilder apiConfig(ApiConfig apiConfig) { this.apiConfig = apiConfig; return this; }
        public ApiLogBuilder responseTimeMs(Long responseTimeMs) { this.responseTimeMs = responseTimeMs; return this; }
        public ApiLogBuilder statusCode(Integer statusCode) { this.statusCode = statusCode; return this; }
        public ApiLogBuilder successFlag(Boolean successFlag) { this.successFlag = successFlag; return this; }
        public ApiLogBuilder errorMessage(String errorMessage) { this.errorMessage = errorMessage; return this; }
        public ApiLogBuilder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }

        public ApiLog build() {
            return new ApiLog(id, apiConfig, responseTimeMs, statusCode, successFlag, errorMessage, timestamp);
        }
    }
}
