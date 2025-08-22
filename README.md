# Arvyax - Wellness Sessions Platform

A modern, full-stack web application for creating and managing wellness sessions. Built with React, Node.js, Express, and MongoDB, featuring a beautiful dark-themed interface with real-time auto-saving capabilities.

![Arvyax Demo](https://img.shields.io/badge/Status-Live-success) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green)

## 🌟 Features

- **User Authentication** - Secure login/register with JWT tokens
- **Session Management** - Create, edit, and publish wellness sessions
- **Real-time Auto-save** - Drafts are automatically saved as you type
- **Modern Dark UI** - Beautiful neutral dark theme with smooth animations
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Search Functionality** - Find sessions by title, type, or content
- **Session Status** - Draft and published states with visual indicators

## 🚀 Live Demo

**Frontend URL:** [https://arvyax.vercel.app](https://arvyax.vercel.app)  
**Backend API:** [https://arvyax-server.onrender.com](https://wellness-session-platform-backend.onrender.com)

> ⚠️ Note: The backend may take a few seconds to spin up on first request due to Render's free tier hibernation.

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/arvyax-wellness.git
cd arvyax-wellness

### 2. Backend Setup

# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

### 3. Frontend Setup

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install


### 4. Run the Application

# Start the backend server
npm run dev

# Start the frontend development server
npm run dev


### 5. Project Structure

```
arvyax-wellness/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.css
│   └── package.json
├── .env
├── .env.example
├── README.md
└── package.json
```