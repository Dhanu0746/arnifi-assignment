# 🚀 Arnifi Assignment – Job Portal Application

## 🌐 Live Demo

* 🔗 Frontend: https://arnifi-assignment.netlify.app
* 🔗 Backend: https://arnifi-assignment.onrender.com

---

## 📌 Overview

This is a **full-stack job portal application** built as part of the Arnifi assignment.
It allows users to browse jobs, apply for positions, and enables admins to manage job listings.

---

## ✨ Features

### 👤 User Features

* Signup & Login (JWT Authentication)
* Browse available jobs
* Apply for jobs
* View applied jobs

### 🛠️ Admin Features

* Create job listings
* Update/Delete jobs
* View all applications
* Role-based access control

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Redux Toolkit
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

## 📂 Project Structure

```
arnifi-assignment/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   ├── components/
│   │   ├── api/
│   │   └── app/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/arnifi-assignment.git
cd arnifi-assignment
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Deployment

* Frontend deployed on **Netlify**
* Backend deployed on **Render**

---

## 🔐 Authentication Flow

* JWT-based authentication
* Stored in HTTP-only cookies / headers
* Protected routes for users and admins

---

## 🙌 Author

**Dhanushree C S**

---

## ⭐ Final Note

This project demonstrates full-stack development skills including authentication, API design, state management, and deployment.
