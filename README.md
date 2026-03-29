# 🚀 LearnSphere — Full Stack Learning Management System

LearnSphere is a scalable, production-ready Learning Management System (LMS) built using a modern full-stack architecture. It supports course creation, authentication, and a containerized microservices setup.

---

## 🧠 Tech Stack

### 🔹 Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Zustand
* React Query

### 🔹 Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Redis

### 🔹 DevOps

* Docker & Docker Compose
* Nginx (Reverse Proxy)
* Certbot (SSL)

---

## 📦 Project Structure

```
LMSproject/
│── client/        # Frontend (React)
│── server/        # Backend (Node.js)
│── nginx/         # Reverse proxy config
│── docker-compose.yml
│── README.md
```

---

## 🚀 Getting Started

### 🔹 Run with Docker

Make sure Docker Desktop is running.

```
docker compose up --build
```

---

### 🌐 Access the Application

* Frontend → http://localhost:3000
* Backend → http://localhost:5000/api/health

---

## 🔐 Environment Variables (IMPORTANT)

⚠️ **Never commit your `.env` files to GitHub**

Create the following files manually:

---

### 📁 server/.env

```
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
REDIS_URL=<your_redis_url>

JWT_ACCESS_SECRET=<your_secure_random_string>
JWT_REFRESH_SECRET=<your_secure_random_string>
```

---

### 📁 client/.env

```
VITE_API_URL=http://localhost:5000/api
```

---

## 🐳 Docker Services

* **client** → React frontend
* **server** → Express backend
* **mongodb** → Database
* **redis** → Cache
* **nginx** → Reverse proxy
* **certbot** → SSL automation

---

## 🧠 Architecture

```
Browser → Nginx → Frontend (React)
                      ↓
                 Backend (Node.js)
                      ↓
              MongoDB + Redis
```

---

## 🔒 Security Notes

* `.env` files are excluded via `.gitignore`
* Secrets (JWT, DB credentials) are NOT stored in the repository
* Use strong random values for all sensitive keys
* In production, use secure secret management systems (e.g., Docker secrets, cloud providers)

---

## 🛠️ Features

* JWT Authentication
* Role-based system (Student / Instructor)
* Course management
* Scalable Docker setup
* Redis caching

---

## 📌 Future Improvements

* Admin dashboard
* Payment integration (Stripe)
* Real-time chat
* Cloud deployment (AWS/GCP)

---

## 👩‍💻 Author

**Bhoomika Agarwal**

---

⭐ Star this repo if you found it useful!
