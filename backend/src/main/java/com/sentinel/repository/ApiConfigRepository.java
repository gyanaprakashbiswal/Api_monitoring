package com.sentinel.repository;

import com.sentinel.entity.ApiConfig;
import com.sentinel.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApiConfigRepository extends JpaRepository<ApiConfig, Long> {
    List<ApiConfig> findByUser(User user);
    List<ApiConfig> findByActiveTrue();
    List<ApiConfig> findByUserAndId(User user, Long id);
}
