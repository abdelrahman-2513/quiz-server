# 📘 NestJS & MongoDB Backend

## 🚀 Overview
This is a **NestJS backend** for managing **quizzes, courses, announcements, and users** with MongoDB. It provides CRUD operations, authentication, and role-based access control.

## 📌 Features
- **Authentication & Authorization** (JWT-based)
- **User Roles**: Admin, Teacher, Student
- **Course Management**: Assign students and teachers to courses
- **Quiz System**: Create, update, and fetch quizzes
- **Quiz Results**: Store student quiz scores
- **Announcements**: Teachers can post announcements for their students
- **MongoDB Integration** with Mongoose

## 🏗️ Tech Stack
- **NestJS** - Backend framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT (JSON Web Token)** - Authentication
- **bcrypt** - Password hashing
- **TypeScript** - Type safety

---

## 📂 Project Structure
```
├── src/
│   ├── auth/           # Authentication module
│   ├── common/         # Shared utilities & middlewares
│   ├── course/        # Course management
│   ├── quiz/        # Quiz management
│   ├── quiz-result/   # Student quiz scores
│   ├── announcement/  # Teacher announcements
│   ├── user/          # User management
│   ├── main.ts         # App entry point
│   ├── app.module.ts   # Root module
├── .env                # Environment variables
├── package.json        # Dependencies & scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Documentation
```

---

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/abdelrahman-2513/quiz-server.git
cd quiz-server
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file and add:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/nestjs
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Server
#### Development Mode
```sh
npm run start:dev
```
#### Production Mode
```sh
npm run build
npm run start:prod
```

---

## 📌 API Endpoints
### **Authentication**
- `POST /auth/signin` - Authenticate and get a JWT token

### **Users**
- `GET /user` - Get all users (admin only)
- `GET /user/:id` - Get user by ID

### **Courses**
- `POST /course` - Create a new course (admin only)
- `GET /course` - Get all courses
- `GET /course/:id` - Get a specific course

### **Quizzes**
- `POST /quiz` - Create a quiz (teacher only)
- `GET /quiz/student/:id` - Get quizzes for a student with scores

### **Announcements**
- `POST /announcement` - Create an announcement (teacher only)
- `GET /announcement` - Get announcements for students

---

## 🛠️ Available Scripts
```sh
npm run start        # Start the app
npm run start:dev    # Start in development mode
npm run build        # Build the app
npm run start:prod   # Start in production mode
npm run lint         # Lint the code

```

---

## 📝 Contributing
1. Fork the repository
2. Create a new branch (`feature/new-feature`)
3. Commit your changes
4. Push to your branch
5. Create a pull request



