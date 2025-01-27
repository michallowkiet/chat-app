# Chat Application

This application is a real-time chat application that allows users to send and receive messages instantly. It uses React with TypeScript for the frontend and Express.js with TypeScript for the backend, ensuring type safety and better code quality.

The frontend is built using Vite, which provides a fast and efficient development environment. With features like message history, user authentication, and real-time updates, the app offers a seamless user experience.

The backend handles routing, authentication, and data storage using Express.js. It integrates with WebSocket for real-time communication and uses TypeScript to define clear interfaces for APIs and database interactions.

For deployment, the application can be hosted on various platforms such as AWS, Heroku, or Google Cloud Platform. The backend runs on Node.js, leveraging the strength of Express.js for handling HTTP requests and WebSocket connections.

## Default Configuration

- **Backend Port:** 3000
- **Frontend Port:** 5173
- **All environments:** .env.dist

## Getting Started

1. **Clone the repository:**
   - `git clone https://github.com/michallowkiet/chat-app.git`
2. **Setup environment variables:**
   - Copy `.env.dist` to `.env` and fill in the necessary environment variables.
3. **Install backend dependencies and start the server:**
   - `cd chat-app/backend`
   - `npm install && npm run dev`
4. **Install frontend dependencies and start the server:**
   - `cd chat-app/frontend`
   - `npm install && npm run dev`
5. **Access the application in your browser:**
   - Open a web browser and navigate to `http://localhost:5173`
6. **Start using the chat application!**
