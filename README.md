# TaskFlow — Mini SaaS Task Management System

A full-stack production-level task management system built with the MERN stack (PostgreSQL instead of MongoDB).

## 🌐 Live Demo

- **Frontend:** https://nimble-cassata-c4f708.netlify.app
- **Backend API:** https://taskflow-backend-qk24.onrender.com

---

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS v3
- React Router DOM v6
- Axios

### Backend
- Node.js + Express
- Sequelize ORM
- PostgreSQL
- JWT Authentication
- bcryptjs
- express-validator

### Database
- PostgreSQL (Local)
- Render PostgreSQL (Production)

---

## ✨ Features

- ✅ User Signup / Login
- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Protected routes (Frontend + Backend)
- ✅ Per-user task management (no global tasks)
- ✅ Create, Read, Update, Delete tasks
- ✅ Task status toggle (Pending → Completed)
- ✅ Input validation
- ✅ Error handling middleware
- ✅ Auto logout on token expiry
- ✅ Responsive UI

---

## 📁 Folder Structure

```
saas-task-manager/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   └── Task.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── config/
│   │   └── db.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── public/
    │   └── _redirects
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js v18+
- PostgreSQL installed
- pgAdmin 4

### 1. Clone the repository

```bash
git clone https://github.com/sudhakarsharma07/saas-task-manager.git
cd saas-task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file from example:

```bash
copy .env.example .env
```

Update `.env` with your values:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=taskmanager
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
```

Create database in pgAdmin:
- Open pgAdmin 4
- Right click Databases → Create → Name: `taskmanager` → Save

Run backend:

```bash
npm run dev
```

You should see:
```
✅ PostgreSQL connected
✅ Tables synced
🚀 Server running on port 5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open browser:
```
http://localhost:5173
```

---

## 🔗 API Endpoints

| Method | Route | Protected | Description |
|--------|-------|-----------|-------------|
| POST | `/api/auth/signup` | No | Register new user |
| POST | `/api/auth/login` | No | Login + get JWT |
| GET | `/api/tasks` | Yes | Get user's tasks |
| POST | `/api/tasks` | Yes | Create new task |
| PUT | `/api/tasks/:id` | Yes | Update task status |
| DELETE | `/api/tasks/:id` | Yes | Delete task |

---

## 🗄️ Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | STRING | User's name |
| email | STRING | Unique email |
| password | STRING | Hashed password |
| createdAt | DATE | Timestamp |

### Tasks Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | STRING | Task title |
| description | TEXT | Task description |
| status | ENUM | pending / completed |
| userId | UUID | Foreign key → Users |
| createdAt | DATE | Timestamp |

---

## 🌍 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Netlify | https://nimble-cassata-c4f708.netlify.app |
| Backend | Render | https://taskflow-backend-qk24.onrender.com |
| Database | Render PostgreSQL | Internal |

---

## 👨‍💻 Author

**Sudhakar Sharma**
- GitHub: [@sudhakarsharma07](https://github.com/sudhakarsharma07)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
