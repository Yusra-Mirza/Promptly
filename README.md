# Promptly 💬

Promptly is a modern, real-time MERN (MongoDB, Express, React, Node) stack chat application. It features real-time communication via Socket.io, user authentication using JSON Web Tokens (JWT), group chat management, active notifications, and a responsive glassmorphic user interface matching a clean, sky-blue bubble aesthetic.

## Features ✨

- **Real-Time Messaging**: Instant message delivery and typing indicators powered by Socket.io.
- **User Authentication**: Secure signup and login with password hashing (bcrypt) and JWT authorization.
- **Group Chats**: Create group chats, add/remove members, rename groups, and leave groups dynamically.
- **User Search**: Search for registered users by name or email to start chats.
- **Notifications**: Dynamic notification system for incoming messages from inactive chat panels.
- **Aesthetic UI**: Custom-tailored typography using Google Font's **Outfit**, custom glassy styling (`backdrop-filter`), and premium responsive widgets.
- **Cloud Integration**: Profile picture uploading supported via Cloudinary.

## Tech Stack 🛠️

- **Frontend**: React (v19), Chakra UI (v2), React Router (v5), Axios, CSS3 (Custom Glassmorphism)
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB (Mongoose ODM)
- **File Storage**: Cloudinary (for profile pictures)

---

## Getting Started 🚀

Follow these steps to run the application locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16+ recommended) and a running instance of MongoDB (locally or a MongoDB Atlas cloud URI).

### 1. Clone the Repository
```bash
git clone https://github.com/Yusra-Mirza/Promptly.git
cd Promptly
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory and define the following variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_signing_secret
```

### 3. Install Dependencies & Start Backend
From the root directory:
```bash
# Install backend dependencies
npm install

# Start backend server (starts server on port 8000)
npm start
```

### 4. Install Dependencies & Start Frontend
Open a new terminal window, navigate to the `frontend` folder:
```bash
cd frontend

# Install frontend dependencies
npm install

# Start frontend application (runs on http://localhost:3000)
npm start
```

---

## Deployment 🌐

To deploy this application to production:

1. **Database**: Spin up a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and whitelist all IPs (`0.0.0.0/0`). Update `MONGO_URI` in your production settings.
2. **Backend**: Deploy the Node/Express backend service to platforms like [Render](https://render.com/), [Railway](https://railway.app/), or [Heroku](https://www.heroku.com/).
3. **Frontend**: Deploy the React build files to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/) for super-fast hosting, or build it statically and serve it from your Node server.
