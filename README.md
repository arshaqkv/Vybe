# 🧠 Simple Social Media App

A full-stack social media application built with:

- **Backend:** Node.js, Express.js, MySQL (no ORM, raw SQL)
- **Frontend:** Next.js (React), ShadCN UI
- **Architecture:** Clean architecture (Domain, Use Cases, Infrastructure)
- **Authentication:** JWT-based
- **Features:** Posts, Likes, Follow/Unfollow, User Suggestions, Pagination

---


## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/social-media-app.git
cd social-media-app

🗄️ Backend Setup
2. Install Dependencies

- cd backend
- npm install


3. Configure .env
- Create a .env file inside backend:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=social_app
JWT_SECRET=your_jwt_secret


4. Set up MySQL Database
---
1- Start MySQL server

2- Create the database:

3- Create tables manually or use SQL script:

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  post_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE follows (
  id INT AUTO_INCREMENT PRIMARY KEY,
  follower_id INT,
  following_id INT,
  FOREIGN KEY (follower_id) REFERENCES users(id),
  FOREIGN KEY (following_id) REFERENCES users(id)
);

Run backend: npm run dev 

🌐 Frontend Setup
6. Install Frontend Dependencies


7. Configure Axios Base URL
Edit frontend/api/axiosInstance.ts:


cd ../frontend
npm install

Run frontend - npm run dev


###✨ Features Implemented
✅ User Sign Up / Login

✅ JWT Authentication

✅ Create & View Posts

✅ Like / Unlike a Post

✅ Follow / Unfollow Users

✅ Suggested Users Sidebar

✅ Pagination for Posts

✅ Clean architecture

✅ Responsive UI using ShadCN
