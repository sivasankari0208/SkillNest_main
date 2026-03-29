# 🌐 SkillNest – Community Service Exchange Platform

---

# 📌 Project Description

**SkillNest** is a community service exchange platform designed for residents within an apartment or residential community. It allows users to share their skills and services with other members of the same community.

The application helps residents easily find trusted services such as **tuition, cooking, repair, cleaning, and other assistance** within their own apartment complex.

This project is developed using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** to create a **private service marketplace** for apartment communities.

Residents can register using their **flat number**, list their **skills/services**, and other residents can **browse and book those services** through the platform.

The system also includes a **booking status tracking feature**, making it easier to manage service requests.

---

# ✨ Key Features

✔ User registration within apartment community
✔ Add and manage services
✔ Browse services from other residents
✔ Book services easily
✔ Booking status tracking
✔ Service reviews and ratings
✔ Simple and user-friendly interface

---

# 🛠 Technologies Used

## 💻 Frontend

| Technology    | Purpose                          |
| ------------- | -------------------------------- |
| ⚛ React.js    | Build interactive user interface |
| 🧱 HTML       | Structure of web pages           |
| 🎨 CSS        | Styling and layout               |
| 📜 JavaScript | Client-side functionality        |

---

## ⚙ Backend

| Technology    | Purpose                         |
| ------------- | ------------------------------- |
| 🟢 Node.js    | Server-side runtime environment |
| 🚀 Express.js | Backend framework for APIs      |

---

## 🗄 Database

| Technology | Purpose                                     |
| ---------- | ------------------------------------------- |
| 🍃 MongoDB | Store users, services, bookings and reviews |

---

## 🔧 Other Tools

| Tool     | Purpose                                    |
| -------- | ------------------------------------------ |
| Mongoose | Connect MongoDB with Node.js               |
| REST API | Communication between frontend and backend |

---

# 📂 Project Structure

```
SkillNest
│
├── backend
│   ├── models
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Booking.js
│   │   └── Review.js
│   │
│   ├── routes
│   │   ├── userRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── reviewRoutes.js
│   │
│   └── server.js
│
├── frontend
│   └── src
│       ├── components
│       │   ├── Navbar.js
│       │   ├── Footer.js
│       │   ├── ServiceList.js
│       │   ├── ReviewList.js
│       │   └── AddReview.js
│       │
│       └── pages
│           ├── Home.js
│           ├── AddServicePage.js
│           ├── AddService.js
│           ├── BookService.js
│           └── BookingsPage.js
│
└── README.md
```

---

# 🧩 Project Modules

## 👤 User Module

Handles user registration and management of user details.

**Functions**

* Register users
* Store user information
* Allow access to platform services

---

## 🛎 Service Module

Allows residents to list and view services.

**Functions**

* Add services
* View services
* Manage service details

---

## 📅 Booking Module

Allows users to book services from other community members.

**Functions**

* Book services
* Manage bookings
* Track booking status

---

## ⭐ Review Module

Allows users to provide feedback after using a service.

**Functions**

* Add reviews
* Display service ratings
* Help users choose reliable service providers

---

## 🧭 Navigation Module

Provides easy navigation across the application.

**Components**

* Navbar
* Footer

---

# 🔄 Application Workflow

1️⃣ Users register using their **flat number**
2️⃣ Residents add **services they provide**
3️⃣ Other users **browse available services**
4️⃣ Users **book services** through the platform
5️⃣ After completion, users can **leave reviews**

---

# ⚡ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/skillnest.git
```

---

## 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 4️⃣ Run Backend Server

```bash
npm start
```

---

## 5️⃣ Run Frontend

```bash
npm start
```

---

# 🚀 Future Enhancements

* User authentication with JWT
* Online payment integration
* Service scheduling system
* Mobile application version
* Notification system
* Admin dashboard

---

# 👨‍💻 Author

**Project:** SkillNest
**Technology:** MERN Stack
**Type:** Academic Mini Project

---
