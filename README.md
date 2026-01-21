# Node.js Express API Server

A lightweight **Express.js + MongoDB** web application that provides RESTful APIs alongside static HTML/CSS/JavaScript file serving. The project follows a **clean three-tier architecture** with clear separation between API logic, data persistence, and frontend assets.

---

## ✨ Features

- RESTful API built with Express.js
- Modular route structure (Auth, Users, Tasks)
- MongoDB integration via Mongoose ODM
- Static frontend file serving
- CORS-enabled cross-origin requests
- Environment-based configuration using dotenv

---

## 🛠 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework & routing
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **cors** – Cross-origin request handling
- **dotenv** – Environment configuration
- **HTML / CSS / JavaScript** – Frontend assets

---

## 🧱 Architecture Overview

The application uses a **three-tier architecture**:

1. **Presentation Layer**
   - Static HTML, CSS, and JavaScript files
   - Served directly by Express

2. **Application Layer**
   - Express routes and middleware
   - Business logic organized by domain

3. **Data Layer**
   - MongoDB database
   - Accessed through Mongoose models

The main entry point is `app.js`, which initializes middleware, mounts routes, connects to MongoDB, and starts the HTTP server.

---

## 🚀 Setup & Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **MongoDB** (local or cloud, e.g. MongoDB Atlas)

---

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/express-mongo-api.git
   cd express-mongo-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**

   Create a `.env` file in the project root:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/your-db-name
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**

   - API Base URL:
     ```text
     http://localhost:5000/api
     ```
   - Root URL (redirects to signup page):
     ```text
     http://localhost:5000/
     ```

---

## 🔗 API Modules

All API routes are mounted under the `/api` base path.

| Module | Endpoint | Description |
|------|---------|-------------|
| Auth | `/api` | Login, signup, token validation |
| User | `/api` | User profiles & settings |
| Task | `/api` | Task CRUD & status management |

---

## 🔄 Middleware Pipeline

Requests pass through the following middleware sequence:

1. **CORS** – Allows GET, POST, PATCH, DELETE
2. **JSON Parser** – Parses request bodies
3. **Static Server** – Serves frontend files
4. **API Routes** – Handles business logic

---

## 🗄 Database Connection

- MongoDB connection is established using Mongoose
- Server starts **only after a successful DB connection**
- Connection details are read from environment variables

---

## 📁 Project Structure

```text
.
├── app.js              # Server entry point
├── routes/
│   ├── auth.js        # Authentication routes
│   ├── user.js        # User management routes
│   └── task.js        # Task management routes
├── .env               # Environment variables (ignored by Git)
├── .gitignore         # Git exclusions
└── static files        # HTML / CSS / JS
```

---

## 🔐 Environment Variables

| Variable | Description | Default |
|--------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | Required |

---

## 🧪 Development Notes

- `node_modules/` and `.env` are excluded via `.gitignore`
- Designed for easy extension with new API modules
- Works with both local and cloud MongoDB instances

---

## 📄 License

Intended for learning, academic, and demonstration purposes. Add a license if publishing publicly.

---

**Express + MongoDB API Server**

