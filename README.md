# Mini Mern Chat Web App

This Mini Mern Chat App is a real-time messaging application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and enhanced with Socket.IO for real-time, bidirectional, and event-based communication.

## Features

- **Real-Time Messaging**: Users can send and receive messages instantly, making communication seamless and efficient.

## Implementation Notes

- **Last Seen Online Feature**: Currently marked as a "won't fix". The feature to show when a user was last online can be easily implemented if needed in future updates.
- **Authentication**: Currently marked as a "won't fix". Since the purpose of the project was to practice websockets, authentication was not a priority. OAuth or custom auth implementation should be trivial to implement.

## Getting Started

To get the app running locally on your machine, follow these steps:

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Installation

1. Clone the repository

   git clone https://github.com/EminMammadzada/mini-mern-chat.git

2. Install the dependencies <br>
  ```cd frontend && npm i``` <br>
  ```cd backend && npm i```

3. Seed the database
  ```cd backend/src/util && node seedDB.js```
  
4. Open 3 separate terminal windows for frontend, backend, and mongodb servers
5. Run the servers
   - Frontend: ```cd frontend && npm run dev```
   - Backend:  ```cd backend && npm run dev```
   - Mongo: ```mongo```

6. Navigate to http://localhost:5173 in your browser to view the app.

### Demo



https://github.com/EminMammadzada/mini-mern-chat/assets/74462948/8ce8708a-c21e-475e-98c3-4b48dfea6d30







