package com.sentinel.dto;

import java.time.LocalDateTime;

public class ApiLogDTO {
    private Long id;
    private Long responseTimeMs;
    private Integer statusCode;
    private Boolean successFlag;
    private String errorMessage;
    private LocalDateTime timestamp;

    public ApiLogDTO(Long id, Long responseTimeMs, Integer statusCode, Boolean successFlag, String errorMessage, LocalDateTime timestamp) {
        this.id = id;
        this.responseTimeMs = responseTimeMs;
        this.statusCode = statusCode;
        this.successFlag = successFlag;
        this.errorMessage = errorMessage;
        this.timestamp = timestamp;
    }

    public static ApiLogDTOBuilder builder() { return new ApiLogDTOBuilder(); }

    public Long getId() { return id; }
    public Long getResponseTimeMs() { return responseTimeMs; }
    public Integer getStatusCode() { return statusCode; }
    public Boolean getSuccessFlag() { return successFlag; }
    public String getErrorMessage() { return errorMessage; }
    public LocalDateTime getTimestamp() { return timestamp; }

    public static class ApiLogDTOBuilder {
        private Long id;
        private Long responseTimeMs;
        private Integer statusCode;
        private Boolean successFlag;
        private String errorMessage;
        private LocalDateTime timestamp;

        public ApiLogDTOBuilder id(Long id) { this.id = id; return this; }
        public ApiLogDTOBuilder responseTimeMs(Long responseTimeMs) { this.responseTimeMs = responseTimeMs; return this; }
        public ApiLogDTOBuilder statusCode(Integer statusCode) { this.statusCode = statusCode; return this; }
        public ApiLogDTOBuilder successFlag(Boolean successFlag) { this.successFlag = successFlag; return this; }
        public ApiLogDTOBuilder errorMessage(String errorMessage) { this.errorMessage = errorMessage; return this; }
        public ApiLogDTOBuilder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }

        public ApiLogDTO build() {
            return new ApiLogDTO(id, responseTimeMs, statusCode, successFlag, errorMessage, timestamp);
        }
    }
}
