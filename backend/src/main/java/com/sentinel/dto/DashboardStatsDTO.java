package com.sentinel.dto;

import java.util.List;

public class DashboardStatsDTO {
    private long totalApis;
    private long healthyApis;
    private long failingApis;
    private long criticalApis;
    private List<ApiStatDTO> apiStats;

    public DashboardStatsDTO(long totalApis, long healthyApis, long failingApis, long criticalApis, List<ApiStatDTO> apiStats) {
        this.totalApis = totalApis;
        this.healthyApis = healthyApis;
        this.failingApis = failingApis;
        this.criticalApis = criticalApis;
        this.apiStats = apiStats;
    }

    public static DashboardStatsDTOBuilder builder() { return new DashboardStatsDTOBuilder(); }

    public long getTotalApis() { return totalApis; }
    public long getHealthyApis() { return healthyApis; }
    public long getFailingApis() { return failingApis; }
    public long getCriticalApis() { return criticalApis; }
    public List<ApiStatDTO> getApiStats() { return apiStats; }

    public static class DashboardStatsDTOBuilder {
        private long totalApis;
        private long healthyApis;
        private long failingApis;
        private long criticalApis;
        private List<ApiStatDTO> apiStats;

        public DashboardStatsDTOBuilder totalApis(long totalApis) { this.totalApis = totalApis; return this; }
        public DashboardStatsDTOBuilder healthyApis(long healthyApis) { this.healthyApis = healthyApis; return this; }
        public DashboardStatsDTOBuilder failingApis(long failingApis) { this.failingApis = failingApis; return this; }
        public DashboardStatsDTOBuilder criticalApis(long criticalApis) { this.criticalApis = criticalApis; return this; }
        public DashboardStatsDTOBuilder apiStats(List<ApiStatDTO> apiStats) { this.apiStats = apiStats; return this; }

        public DashboardStatsDTO build() {
            return new DashboardStatsDTO(totalApis, healthyApis, failingApis, criticalApis, apiStats);
        }
    }
}
