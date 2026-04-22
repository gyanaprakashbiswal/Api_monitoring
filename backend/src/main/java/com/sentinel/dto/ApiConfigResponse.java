package com.sentinel.dto;

public class ApiConfigResponse {
    private Long id;
    private String name;
    private String url;
    private String method;
    private String headers;
    private Integer intervalMinutes;
    private Integer timeoutSeconds;
    private Boolean active;

    public ApiConfigResponse(Long id, String name, String url, String method, String headers, Integer intervalMinutes, Integer timeoutSeconds, Boolean active) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.intervalMinutes = intervalMinutes;
        this.timeoutSeconds = timeoutSeconds;
        this.active = active;
    }

    public static ApiConfigResponseBuilder builder() { return new ApiConfigResponseBuilder(); }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getUrl() { return url; }
    public String getMethod() { return method; }
    public String getHeaders() { return headers; }
    public Integer getIntervalMinutes() { return intervalMinutes; }
    public Integer getTimeoutSeconds() { return timeoutSeconds; }
    public Boolean getActive() { return active; }

    public static class ApiConfigResponseBuilder {
        private Long id;
        private String name;
        private String url;
        private String method;
        private String headers;
        private Integer intervalMinutes;
        private Integer timeoutSeconds;
        private Boolean active;

        public ApiConfigResponseBuilder id(Long id) { this.id = id; return this; }
        public ApiConfigResponseBuilder name(String name) { this.name = name; return this; }
        public ApiConfigResponseBuilder url(String url) { this.url = url; return this; }
        public ApiConfigResponseBuilder method(String method) { this.method = method; return this; }
        public ApiConfigResponseBuilder headers(String headers) { this.headers = headers; return this; }
        public ApiConfigResponseBuilder intervalMinutes(Integer intervalMinutes) { this.intervalMinutes = intervalMinutes; return this; }
        public ApiConfigResponseBuilder timeoutSeconds(Integer timeoutSeconds) { this.timeoutSeconds = timeoutSeconds; return this; }
        public ApiConfigResponseBuilder active(Boolean active) { this.active = active; return this; }

        public ApiConfigResponse build() {
            return new ApiConfigResponse(id, name, url, method, headers, intervalMinutes, timeoutSeconds, active);
        }
    }
}
