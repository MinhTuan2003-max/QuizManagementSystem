# 🎓 Quiz Management System API

A robust, scalable, and secure backend system for managing quizzes, built with **Spring Boot 3.x**. This project implements modern security standards, centralized error handling, and aspect-oriented programming for logging and auditing.

---

## 🚀 Key Features

* **Secure Authentication**: Stateless authentication using **JWT (JSON Web Token)**.
* **Token Refresh Mechanism**: Secure token renewal with a database-backed **Refresh Token** system.
* **Role-Based Access Control (RBAC)**: Fine-grained authorization for `ADMIN` and `USER` roles.
* **Global Exception Handling**: Centralized error management using `@RestControllerAdvice` and `BaseException` for consistent API responses.
* **Unified Logging & Auditing**: Aspect-Oriented Programming (AOP) for automatic activity tracking (`@TrackActivity`) and security logging.
* **Data Validation**: Strict request validation using Jakarta Validation annotations.
* **API Documentation**: Fully documented interactive API using **Swagger/OpenAPI 3**.

---

## 🛠 Tech Stack

* **Framework**: Spring Boot 3.x
* **Security**: Spring Security 6 (Stateless)
* **ORM**: Spring Data JPA / Hibernate
* **Database**: MySQL / PostgreSQL
* **Documentation**: SpringDoc OpenAPI
* **Utilities**: Lombok, MapStruct (optional), AspectJ
* **Containerization**: Docker & Docker Compose

---

## 🏗 Project Architecture

The project follows a clean, layered architecture:

1. **Controller Layer**: Handles HTTP requests and response mapping.
2. **Service Layer**: Encapsulates business logic.
3. **Repository Layer**: Interacts with the database.
4. **Security/Aspect Layer**: Cross-cutting concerns like JWT validation and logging.
5. **Exception Layer**: Global error interception and translation.

---

## 📋 API Endpoints (Quick Reference)

### Authentication

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/v1/auth/register` | Register a new user | No |
| `POST` | `/api/v1/auth/login` | Login and get tokens | No |
| `POST` | `/api/v1/auth/refresh-token` | Renew Access Token | No |

---

## ⚙️ Setup & Installation

### Prerequisites

* JDK 17+
* Maven 3.6+
* Docker & Docker Compose

### Configuration

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quiz-system.git
cd quiz-system

```


2. Configure your `application.properties` or `application.yml`:
```properties
security.jwt.secret=your_secret_key
security.jwt.expiration=3600000
security.jwt.refresh-expiration=86400000

```



### Running with Docker

```bash
# Build and run all services (App + Database)
docker-compose up --build

```

---

## 🛡 Security & Logging

This project leverages **Spring AOP** to separate concerns:

* **Activity Tracking**: Annotate any method with `@TrackActivity("Description")` to automatically log successful or failed operations.
* **JWT Auditing**: Every token parsing attempt is intercepted to log security events (Expired, Invalid, Success).

---

## ⚠️ Error Handling

Every error response follows a unified structure:

```json
{
  "success": false,
  "code": 403,
  "message": "Refresh token was expired...",
  "data": {
    "errorCode": "AUTH_003"
  }
}

```

* **I18n Support**: Messages are translated based on the `Accept-Language` header using `MessageSource`.

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
