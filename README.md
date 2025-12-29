# Quiz Management System

A robust and scalable **Spring Boot** application designed for managing educational quizzes, a comprehensive question bank, and user roles with a strong focus on **security**, **performance**, and **clean architecture**.

---

## 🚀 Key Features

### 🔹 Standardized API Architecture
- All endpoints follow the `/api/v1/` versioning convention.
- Uses a unified `ApiResponseDTO` wrapper for consistent client-side handling.

### 🔹 Role-Based Access Control (RBAC)
- Integrated **Spring Security** with **JWT (Bearer Token)** authentication.
- Fine-grained permission management for **Administrators** and **Users**.

### 🔹 Dynamic Question Bank
- Supports multiple question types (e.g. `SINGLE_CHOICE`).
- Configurable scoring system.
- Flexible answer sets per question.

### 🔹 Advanced Role Management
- Paginated role retrieval.
- Advanced searching using **JPA Specifications**:
  - Filter by role name (keyword).
  - Filter by status (active / inactive).

### 🔹 Automated Data Mapping
- High-performance, type-safe mapping using **MapStruct**.
- Handles complex entity relationships and inheritance.
- Seamless integration with Lombok.

### 🔹 API Documentation
- Fully documented using **Swagger / OpenAPI 3.0**.
- Interactive API testing via Swagger UI.

---

## 🛠 Tech Stack

| Layer            | Technology |
|------------------|------------|
| Backend          | Java 17, Spring Boot 3.x |
| Security         | Spring Security, JWT |
| Persistence      | Spring Data JPA, Hibernate |
| Mapping          | MapStruct, Lombok |
| Build Tool       | Maven |
| Documentation    | SpringDoc OpenAPI (Swagger) |
| Validation       | Jakarta Bean Validation |

---

## 📂 Project Structure Highlights

### 1️⃣ Data Transfer Objects (DTOs)
The project uses **Java Records** to ensure immutability and concise code:

- **QuestionRequestDTO**  
  Captures question content, type, score, and a set of answers.

- **AnswerDTO**  
  Defines the structure of an answer, including the `isCorrect` flag.

- **PageResponseDTO\<T\>**  
  A generic wrapper for all paginated responses to simplify frontend integration.

---

### 2️⃣ Service Layer
Business logic is encapsulated within service implementations:

- **RoleService**
  - Role management logic.
  - Specification-based searching and pagination.

- **QuestionService**
  - Manages question lifecycle.
  - Handles question–answer relationships.

---

### 3️⃣ Mapping Layer
Clean separation between entities and DTOs:

- **QuestionMapper**
  - Maps questions and answer sets.
  - Ignores metadata fields (`createdAt`, `updatedAt`) during updates.

- **UserMapper**
  - Converts role entities to string-based representations for responses.

---

## ⚙️ Getting Started

### ✅ Prerequisites
- JDK 17 or higher
- Maven 3.6+
- SQL Database (MySQL / PostgreSQL)

---

### 📥 Installation

#### 1. Clone the repository
git clone https://github.com/your-repo/quiz-management-system.git
cd quiz-management-system
