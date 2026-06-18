# Job Hunt Tracker API 🚀
<div align="center">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
  <img src="https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</div>
**🟢 Live API URL:** [https://job-hunt-tracker-api.onrender.com](https://job-hunt-tracker-api.onrender.com)

> **Note:** This API is hosted on a free Render instance. If it hasn't been used in 15 minutes, the server goes to sleep. **The very first request might take 50 seconds to respond** while the server wakes up. Subsequent requests will be blazing fast!

A robust, TypeScript-based RESTful API designed to manage and track the lifecycle of job applications. Built with Express.js, this API features a complete CRUD workflow, advanced data aggregation, strictly typed validations, and robust security middleware.

## Features
* **Advanced Statistics Pipeline:** Generates real-time aggregations (response rates, offer rates, average days to response) using efficient in-memory array reductions.
* **Complex Filtering & Sorting:** Dynamic querying by status, company name, and date arrays.
* **Strict Validation:** End-to-end schema validation using `Zod`.
* **Security & Reliability:** Integrated with `Helmet` for HTTP headers, centralized AppError handling, rate limiting, and `Morgan` request logging.
* **Core Lifecycle Management** Complete RESTful CRUD architecture to seamlessly manage job applications from initial submission to final decision.

---

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Validation:** Zod
* **Middleware:** Helmet, Morgan, Express Rate Limit, CORS

---

## API Endpoints

Base URL: `/api/v1/jobs`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/` | Create a new job application. Requires `company` and `role`. |
| **GET** | `/` | Retrieve all applications. Supports query parameters for filtering/sorting. |
| **GET** | `/stats` | Retrieve aggregated application statistics and conversion rates. |
| **GET** | `/:id` | Retrieve a specific application by its ID. |
| **PATCH** | `/:id` | Update specific fields of an existing application. |
| **DELETE** | `/:id` | Remove a job application from the database. |

### Query Parameters (GET `/`)
You can chain query parameters to filter and sort your application list:
* `status`: Filter by specific `ApplicationStatus` (e.g., `?status=TECHNICAL`)
* `company`: Search by company name (e.g., `?company=google`)
* `sort`: Sort by any key (e.g., `?sort=appliedAt`)
* `order`: Ascending or descending (e.g., `?order=desc`)

**Example:** `GET /api/v1/jobs?status=TECHNICAL&company=startup&sort=appliedAt&order=desc`

---

## Data Models

### ApplicationStatus Enum

    enum ApplicationStatus {
      APPLIED = 'APPLIED',
      PHONE_SCREEN = 'PHONE_SCREEN',
      TECHNICAL = 'TECHNICAL',
      FINAL_ROUND = 'FINAL_ROUND',
      OFFER = 'OFFER',
      REJECTED = 'REJECTED',
      GHOSTED = 'GHOSTED'
    }

---

## Sample Responses

### GET `/api/v1/jobs/stats`
Returns aggregated analytics based on the current state of all tracked applications.

    {
      "success": true,
      "data": {
        "total": 42,
        "status": {
          "APPLIED": 10,
          "PHONE_SCREEN": 8,
          "TECHNICAL": 6,
          "FINAL_ROUND": 4,
          "OFFER": 2,
          "REJECTED": 7,
          "GHOSTED": 5
        },
        "responseRate": 64,
        "offerRate": 5,
        "avgDaysToFirstResponse": 12
      }
    }

---

## Local Development Setup

**1. Clone the repository:**

    git clone <repository-url>

**2. Install dependencies:**

    npm install

**3. Setup Database File:**
Duplicate the provided template file and rename it to enable local persistence:
*(Ensure `data.json` is added to your `.gitignore`)*

    cp data.example.json data.json

**4. Start the development server:**

    npm run dev
