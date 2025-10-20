# 🧩 Mini-CRM API (NestJS)

A small CRM REST API built with **NestJS** for managing companies and employees.  
This project demonstrates **authentication, CRUD operations, notifications, pagination**, and **Dockerized deployment**.

---

## 🚀 Features

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

| Layer | Technology |
|-------|-------------|
| Backend | [NestJS](https://nestjs.com/) |
| Database | [MongoDB](https://www.mongodb.com/) |
| Mail | [MailDev](https://maildev.github.io/maildev/) |
| ORM | [Mongoose](https://mongoosejs.com/) |
| Language | TypeScript |
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
### 2️⃣ Create `.env.local` file
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
| ------------ |------------------------------------------------------------------|
| API          | [http://localhost:5555](http://localhost:5555)                   |
| Swagger Docs | [http://localhost:5555/api/docs](http://localhost:5555/api/docs) |
| MailDev UI   | [http://localhost:1080](http://localhost:1080)                   |

## 🌱 Database Seeding
Seeder automatically generates:

- 10 random companies
- 100 random employees
- Random employee–company associations

### ✅ To run seeder (inside Docker container):
```bash
docker exec -it mini-crm npm run seed
```

If you’re running locally (not Docker):
```bash
npm run seed:local
```
## 🧪 Development (Local Run)
If you want to run without Docker:
```bash
npm install
npm run start:local:win
```
Make sure MongoDB and MailDev are running locally:
```bash
mongod
npm run maildev
```




