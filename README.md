# DooIt - Full Stack Task Management App

DooIt is a full-stack Todo application built with a scalable architecture using Node.js, Express, MongoDB (Backend) and React with Redux (Frontend).

---

## Features

- Authentication (Login / Signup with OTP)
- Create, Update, Delete Todos
- Toggle Todo Completion
- Bulk Delete Todos
- Dark Mode Support (localStorage based)
- Responsive UI
- Redux State Management
- Protected Routes (Frontend + Backend validation)
- Clean Architecture (Controllers, Services, Middleware)

---

## Project Structure

### Backend (/backend)

```

backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── index.ts
│
├── dist/
├── node_modules/
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yaml
├── Dockerfile
├── package.json
└── tsconfig.json

```

### Frontend (/frontend)

```

frontend/
│
├── public/
├── src/
│   ├── features/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── node_modules/
├── package.json
└── vite.config.js

```

---

## API Routes

### Auth Routes (`/api/auth`)

```

POST   /login        -> Login user
POST   /signup       -> Register user
POST   /signup/otp   -> Verify signup OTP

```

### Protected Routes (Require Authentication)

```

GET    /me                 -> Check authenticated user
GET    /todos              -> Get all todos
POST   /create             -> Create new todo
PATCH  /edit               -> Update todo
PATCH  /todo/:todoId       -> Toggle completed
DELETE /todo/:todoId       -> Delete single todo
DELETE /todo               -> Delete multiple todos

```

---

## Route Architecture

- `/auth/*` routes are public
- All other routes are protected using `authMiddleware`
- Middleware validates user before accessing todos

Example:

```

router.use("/auth", authRoutes);
router.use("/", authMiddleware, todoRoutes);

```

---

## Tech Stack

Frontend:
- React
- Redux Toolkit
- React Router
- CSS

Backend:
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)

DevOps:
- Docker
- Docker Compose

---

## Environment Variables

Create a `.env` file in backend:

```

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

```

---

## Installation

Clone the repository:

```

git clone [https://github.com/shikharyadav16/todo.git](https://github.com/shikharyadav16/todo.git)
cd dooit

```

### Backend Setup

```

cd backend
npm install
npm run build
npm start

```

### Frontend Setup

```

cd frontend
npm install
npm run dev

```

---

## Architecture Notes

- Controllers handle request/response
- Services contain business logic
- Middleware handles authentication and errors
- Redux manages global frontend state
- API calls are centralized in frontend services

---

## Future Improvements

- Real-time updates with Socket.io
- File attachments in todos
- Role-based access control
- Notifications system
- AI-powered task suggestions

---

## License

MIT
