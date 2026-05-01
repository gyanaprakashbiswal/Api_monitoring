# API Monitoring & Performance Tracking System

A secure backend monitoring platform built with **Java Spring Boot** to track API uptime, response times, health status, and performance metrics across multiple services.
Designed for automated monitoring, role-based access control, and reliable audit logging.

## 🚀 Project Highlights

* Developed a **backend monitoring system** using Java + Spring Boot for tracking API availability and latency.
* Implemented **scheduled health checks** using Spring Scheduler for automated interval-based monitoring.
* Secured APIs using **Spring Security + JWT Authentication**.
* Added **Role-Based Access Control (RBAC)** to restrict sensitive monitoring endpoints.
* Stored logs, health reports, and metrics using **PostgreSQL + Hibernate (JPA)**.
* Built scalable architecture for monitoring multiple external/internal services.

## 🛠️ Tech Stack

* Java 17+
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Scheduler
* Hibernate / JPA
* PostgreSQL
* Maven / Gradle
* REST APIs

## 📂 Project Structure

```bash id="fj7n2e"
API-Monitoring-System/
│── src/main/java/com/project/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── security/
│   ├── scheduler/
│   └── config/
│── src/main/resources/
│   ├── application.properties
│── pom.xml
│── README.md
```

## ⚡ Core Features

### API Monitoring

* Track API uptime / downtime
* Measure response times
* Detect failed requests
* Monitor status codes (200, 404, 500, etc.)
* Multi-service monitoring support

### Scheduled Health Checks

* Configurable monitoring intervals
* Automatic background health checks
* Continuous service availability tracking

### Security

* JWT-based login authentication
* Secure protected endpoints
* Role-based access (Admin / User)

### Logs & Metrics

* Store monitoring history
* Query historical uptime reports
* Performance trend tracking
* Audit trail for failures

## ⚡ Installation


git clone https://github.com/yourusername/API-Monitoring-System.git

cd API-Monitoring-System


## ▶️ Run Application


mvn spring-boot:run


## 🔐 Sample Endpoints


POST   /auth/login
POST   /auth/register
GET    /api/monitor/status
GET    /api/monitor/history
POST   /api/monitor/add-service






