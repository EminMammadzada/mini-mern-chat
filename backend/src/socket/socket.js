// socketServer.js
const { Server } = require("socket.io");

let io;
const userSocketMap = {};

function initializeSocketServer(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Connection established, ", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
    }
    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      console.log(`User with socket ID ${socket.id} disconnected`);
    });
  });

  return io;
}

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

module.exports = { initializeSocketServer, getReceiverSocketId };
