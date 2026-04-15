# Todo Web App

A full-stack Todo application with a clean UI, secure authentication, and a scalable backend built using **Express, TypeScript, MongoDB, and JWT**.

---

## Features

* User Authentication (Signup / Login)
* Create, Update, Delete Todos
* Mark Todos as Completed
* Clean and Minimal UI
* JWT-based Authentication (Cookies)
* Structured Backend Architecture
* Docker Support

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB (Mongoose)
* JWT Authentication

### DevOps

* Docker
* Docker Compose

---

## Project Structure

```
src/
 ├── config/        # DB & env configuration
 ├── controllers/   # Route handlers
 ├── middlewares/   # Auth middleware
 ├── models/        # Mongoose models
 ├── routes/        # API routes
 ├── utils/         # Helper functions
 └── index.ts       # Entry point
```

---

## Environment Variables

Create a `.env` file in the root:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=3000
```

---

## Installation

```bash
git clone https://github.com/your-username/todo-backend.git
cd todo-backend
npm install
```

---

## Run Locally

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

## Run with Docker

```bash
docker-compose up --build
```

---

## API Endpoints

### Auth

* `POST /api/auth/signup` → Register user
* `POST /api/auth/login` → Login user

### Todos

* `GET /api/todo` → Get all todos
* `POST /api/todo` → Create todo
* `POST /api/edit` → Update todo
* `DELETE /api/delete` → Delete todo

---

## Security

* Environment variables are secured using `.env`
* `.env` is ignored via `.gitignore`
* JWT used for authentication

---

## Future Improvements

* Refresh Tokens
* Pagination & Filtering
* Frontend Integration (React)
* CI/CD Pipeline
* Deployment (AWS / Koyeb)

---

## Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

---

## License

This project is licensed under the MIT License.

---

## Author

Shikhar

---
