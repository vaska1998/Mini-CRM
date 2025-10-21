# 🧩 Mini-CRM (Fullstack: NestJS + React + MongoDB)

A small full-stack CRM system with:
- 🧠 NestJS backend (REST API + authentication)
- 💅 React (Vite + Tailwind) frontend
- 🍃 MongoDB database
- ✉️ MailDev for email testing

---

## 🚀 Features

### 🖥️ Frontend
- Built with React + Vite + Tailwind CSS

- Pages:

- [x] 🔐 Login
- [x] 🏢 Companies (list, create, edit, delete, pagination, search, filtering)
- [x] 👷 Employees (list, create, edit, delete, pagination, search, filtering)
- Pagination (10 items per page)
- Routing between Companies ↔ Employees
- API integration with backend
- Responsive minimalist UI

### ⚙️ Backend
- **JWT Authentication** (with default admin user)
- **Companies Management** (CRUD + logo upload)
- **Employees Management** (CRUD + link to companies)
- **Notifications** — email to admin when a new company is created
- **Seeder** — generates sample companies & employees
- **Pagination, filtering, search**
- **Swagger API Docs** (`/api/docs`)
- **Dockerized setup** (MongoDB, API, MailDev)
- **MailDev** integration for local email testing

---

## ⚙️ Tech Stack

| Layer            | Technology |
|------------------|-------------|
| Frontend         | React + Vite + Tailwind CSS |
| Backend          | [NestJS](https://nestjs.com/) |
| Database         | [MongoDB](https://www.mongodb.com/) |
| Mail             | [MailDev](https://maildev.github.io/maildev/) |
| ORM              | [Mongoose](https://mongoosejs.com/) |
| Language         | TypeScript |
| Containerization | Docker, Docker Compose |

---

## 🧰 Requirements

- [Node.js](https://nodejs.org/) ≥ 20
- [Docker & Docker Compose](https://www.docker.com/)
- (optional) [npm](https://www.npmjs.com/) if running locally

---

## 🐳 Docker Setup

### 1️⃣ Clone repository

```bash
git clone https://github.com/vaska1998/mini-crm.git
cd mini-crm
```
### 2️⃣ Create `.env.local` file inside backend/
Use `env.example` as a template.

### 3️⃣ Build and start Docker containers
```bash
docker-compose up --build
```
📦 This command starts 3 services:

mongo → MongoDB database

maildev → test SMTP server (UI at http://localhost:1080)

api → NestJS backend (on http://localhost:5555)

### 4️⃣ Access the services

| Service      | URL                                                              |
|--------------|------------------------------------------------------------------|
| API          | [http://localhost:5555](http://localhost:5555)                   |
| Frontend     | [http://localhost:5173](http://localhost:5173)                   |
| Swagger Docs | [http://localhost:5555/api/docs](http://localhost:5555/api/docs) |
| MailDev UI   | [http://localhost:1080](http://localhost:1080)                   |

## 🌱 Database Seeding
Seeder automatically generates:

- 10 random companies
- 100 random employees
- Random employee–company associations

### ✅ To run seeder (inside Docker container):
```bash
docker exec -it mini-crm-backend npm run seed
```

If you’re running locally (not Docker):
```bash
cd backend
npm run seed:local
```
## 🧪 Development (Manual)
### Run backend locally
```bash
cd backend
npm install
npm run start:local:win
```

### Run frontend locally
```bash
cd frontend
npm install
npm run dev
```
Make sure MongoDB and MailDev are running locally:
```bash
mongod
npm run maildev
```




