package com.sentinel.repository;

import com.sentinel.entity.ApiConfig;
import com.sentinel.entity.ApiLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ApiLogRepository extends JpaRepository<ApiLog, Long> {
    void deleteByApiConfig(ApiConfig apiConfig);
    List<ApiLog> findByApiConfigOrderByTimestampDesc(ApiConfig apiConfig);

    List<ApiLog> findTop10ByApiConfigOrderByTimestampDesc(ApiConfig apiConfig);

    Optional<ApiLog> findTopByApiConfigOrderByTimestampDesc(ApiConfig apiConfig);
    Optional<ApiLog> findFirstByApiConfigOrderByTimestampDesc(ApiConfig apiConfig);

    @Query("SELECT l FROM ApiLog l WHERE l.apiConfig = :config ORDER BY l.timestamp DESC LIMIT :n")
    List<ApiLog> findLastNLogs(@Param("config") ApiConfig config, @Param("n") int n);

    @Query("SELECT COUNT(l) FROM ApiLog l WHERE l.apiConfig = :config AND l.successFlag = false ORDER BY l.timestamp DESC")
    long countRecentFailures(@Param("config") ApiConfig config);
}
