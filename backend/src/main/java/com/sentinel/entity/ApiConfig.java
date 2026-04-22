package com.sentinel.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "api_configs")
public class ApiConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String method = "GET";

    @Column(columnDefinition = "TEXT")
    private String headers;

    @Column(nullable = false)
    private Integer intervalMinutes = 1;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false)
    private Integer timeoutSeconds = 10;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "apiConfig", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<com.sentinel.entity.ApiLog> logs = new java.util.ArrayList<>();

    public ApiConfig() {}

    public ApiConfig(Long id, String name, String url, String method, String headers, Integer intervalMinutes, Boolean active, Integer timeoutSeconds, User user) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.intervalMinutes = intervalMinutes;
        this.active = active;
        this.timeoutSeconds = timeoutSeconds;
        this.user = user;
    }

    public static ApiConfigBuilder builder() { return new ApiConfigBuilder(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }
    public String getHeaders() { return headers; }
    public void setHeaders(String headers) { this.headers = headers; }
    public Integer getIntervalMinutes() { return intervalMinutes; }
    public void setIntervalMinutes(Integer intervalMinutes) { this.intervalMinutes = intervalMinutes; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
    public Integer getTimeoutSeconds() { return timeoutSeconds; }
    public void setTimeoutSeconds(Integer timeoutSeconds) { this.timeoutSeconds = timeoutSeconds; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public static class ApiConfigBuilder {
        private Long id;
        private String name;
        private String url;
        private String method = "GET";
        private String headers;
        private Integer intervalMinutes = 1;
        private Boolean active = true;
        private Integer timeoutSeconds = 10;
        private User user;

        public ApiConfigBuilder id(Long id) { this.id = id; return this; }
        public ApiConfigBuilder name(String name) { this.name = name; return this; }
        public ApiConfigBuilder url(String url) { this.url = url; return this; }
        public ApiConfigBuilder method(String method) { this.method = method; return this; }
        public ApiConfigBuilder headers(String headers) { this.headers = headers; return this; }
        public ApiConfigBuilder intervalMinutes(Integer intervalMinutes) { this.intervalMinutes = intervalMinutes; return this; }
        public ApiConfigBuilder active(Boolean active) { this.active = active; return this; }
        public ApiConfigBuilder timeoutSeconds(Integer timeoutSeconds) { this.timeoutSeconds = timeoutSeconds; return this; }
        public ApiConfigBuilder user(User user) { this.user = user; return this; }

        public ApiConfig build() {
            return new ApiConfig(id, name, url, method, headers, intervalMinutes, active, timeoutSeconds, user);
        }
    }
}
