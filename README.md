# ⭐ Rating App

A full-stack **Rating Application** where users can rate products and store owners can manage their stores.  
Built with **React, Node.js (Express), PostgreSQL, and Render** deployment.

---

## 🚀 Live Demo
- **Frontend (React)**: [https://rating-app-frontend.onrender.com](https://rating-app-frontend.onrender.com)  
- **Backend (Express + PostgreSQL)**: [https://rating-app-backend-k9u7.onrender.com](https://rating-app-backend-k9u7.onrender.com)
-   Backend-Github-Repo:[https://github.com/Ashwastaken78867/Rating_App_Backend]

---

## 📌 Features
- 🔑 User authentication (JWT-based)
- 🏬 Store management for owners
- ⭐ Users can rate stores
- 📊 Dashboard for store owners
- 🗄️ PostgreSQL database hosted on Render
- 🎨 Responsive frontend with React + Tailwind

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL (Hosted on Render)  
- **Deployment:** Render  

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/rating-app.git
cd rating-app
```
### 2. Backend Setup
```bash
cd backend
npm install
```
. Create a .env file 
```bash
DATABASE_URL=postgresql://<username>:<password>@<host>:5432/ratingapp?sslmode=require
JWT_SECRET=your_jwt_secret
PORT=5000
```
. Run migrations:
```bash
psql "<DATABASE_URL>" -f schema.sql
```
. Start backend:
```bash
npm start
```
### 3.Frontend Setup
```bash
cd frontend
npm install
```
. Create .env file 
```bash
VITE_API_BASE_URL=https://backend-k9u7.com
```
. Start frontend
```bash
npm run dev
```

### 📂 API Routes
## Auth
```bash
 POST /auth/register → Register user.
 POST /auth/login → Login user.
```
## Store
```bash
 POST /store → Create new store (Owner only)
 GET /store → Get all stores
 GET /store/:id → Get store details
```
## Rating
```bash
 POST /rating/:storeId → Add rating to store
 GET /rating/:storeId → Get ratings of store
```
### 🗄️ Database Schema
```bash
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) CHECK(role IN ('user', 'owner')) NOT NULL
);

CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner_id INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  store_id INT REFERENCES stores(id) ON DELETE CASCADE,
  rating INT CHECK(rating >= 1 AND rating <= 5),
  comment TEXT
);
```
# Rating App

## User View
![User Screenshot](https://github.com/Ashwastaken78867/Rating_App_Frontend/blob/main/src/assets/ss1.png?raw=true)

## Owner View
![Owner Screenshot](https://github.com/Ashwastaken78867/Rating_App_Frontend/blob/main/src/assets/ss2.png?raw=true)

---

## 👨‍💻 Author

**Ash Bagda**  
Full Stack Developer | MERN | NestJS | PostgreSQL | Docker  

- GitHub: [@Ashwastaken78867](https://github.com/Ashwastaken78867)  
- LinkedIn: [Ash Bagda](https://www.linkedin.com/in/ash-bagda/)  

⭐ If you found this project helpful, consider giving it a star! ⭐























