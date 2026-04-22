# Sentinel Zero-G: Project Architecture Guide

This document provides a detailed breakdown of the technical architecture, file structure, and operational workflows of the Sentinel Zero-G API monitoring suite.

## 🏗️ System Overview

Sentinel Zero-G is a full-stack monitoring system designed for high-performance, stateless API oversight. It uses a **Spring Boot 3.4** backend and a **React (Vite)** frontend, secured by **JWT (JSON Web Tokens)**.

---

## 🖥️ Backend Architecture (Spring Boot)

The backend follows a strict **Layered Architecture** to ensure separation of concerns and maintainability.

### 📦 Package Structure: `com.sentinel`

| Package | Purpose | Key Files |
| :--- | :--- | :--- |
| **`.config`** | System-wide configuration. | `DataSeeder.java` (Auto-creates admin user) |
| **`.controller`** | REST Endpoints (Entry points). | `AuthController.java`, `DashboardController.java` |
| **`.service`** | Business Logic & Orchestration. | `AuthService.java`, `ApiCheckService.java` (Monitoring engine) |
| **`.security`** | Authentication & Filter Chain. | `SecurityConfig.java`, `JwtAuthenticationFilter.java` |
| **`.repository`** | Database Abstraction (JPA). | `UserRepository.java`, `ApiConfigRepository.java` |
| **`.entity`** | Data Models (Database Tables). | `User.java`, `ApiConfig.java`, `ApiResult.java` |
| **`.dto`** | Data Transfer Objects. | `AuthRequest.java`, `AuthResponse.java` |
| **`.scheduler`**| Background Task Management. | `ApiMonitoringScheduler.java` |

### 🔐 Security & Auth Flow
1.  **Stateless JWT**: No session state is held on the server. Every request must include an `Authorization: Bearer <token>` header.
2.  **Filter Chain**: The `JwtAuthenticationFilter` intercepts every request.
    -   If the path is `/api/auth/**`, it is **bypassed** (`shouldNotFilter`).
    -   Otherwise, it extracts the token, validates it against the DB, and sets the Security Context.
3.  **Authentication Entry Point**: Returns `401 Unauthorized` as clean JSON if a user tries to access a protected resource without a valid token.

---

## 🎨 Frontend Architecture (React + Vite)

The frontend is a modern SPA (Single Page Application) with a **Physics-Free CSS Design** for maximum stability.

### 📂 Directory Structure: `/src`

-   **`/pages`**: Full-page layouts.
    -   `AuthPage.jsx`: Unified Login/Register screen.
    -   `Dashboard.jsx`: Real-time monitoring hub.
-   **`/components`**: Reusable UI elements (Glassmorphism style).
    -   `ApiMonitorCard.jsx`: Displays metrics for a single API.
    -   `AddApiModal.jsx`: Configuration entry.
-   **`/hooks`**: Custom React hooks for logic reuse.
    -   `useAuth.js`: Manages login, registration, and localStorage persistence.
-   **`/services`**: API Communication.
    -   `apiClient.js`: Axios instance with an **interceptor** to automatically handle 401/403 errors by redirecting to login.

---

## 🔄 Core Workflows

### 1. Registration & Login Flow
-   **Registration**: Browser sends POST to `/api/auth/register`. The backend hashes the password, saves to H2, and returns a success message.
-   **Login**: Browser sends POST to `/api/auth/login`. Backend verifies password, generates a JWT, and returns it.
-   **Persistence**: The React hook `useAuth` saves the token to `localStorage` and redirects the user to the Dashboard.

### 2. API Monitoring Cycle (The "Sentinel" Loop)
1.  **Configuration**: User adds an API (URL, method, check frequency) via the Dashboard.
2.  **Scheduling**: `ApiMonitoringScheduler` polls the database and identifies APIs due for a check.
3.  **Execution**: `ApiCheckService` uses `RestTemplate` or `WebClient` to ping the target API asynchronously.
4.  **Results**: Response time, status code, and availability are saved as `ApiResult` entities.
5.  **Telemetry**: The Dashboard polls `/api/dashboard/stats` to display high-level metrics (Uptime, Avg Latency).

---

## 🛠️ Technology Stack Summarized

-   **Backend**: Java 21, Spring Boot 3.4, Spring Security, Spring Data JPA, H2 In-Memory DB (Physics-Free Persistence).
-   **Frontend**: React 18, Vite, TailwindCSS (for Layout), Vanilla CSS (for Components), Lucide Icons.
-   **Build**: Maven (Backend), NPM (Frontend).

---

> [!IMPORTANT]
> **Data Persistence Notice**: Currently using H2 In-Memory database. Restarts will wipe the database. The `DataSeeder` automatically creates a fallback `admin` / `admin123` account on every boot.
