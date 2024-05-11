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
    // store the users that are currently online
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
    }
    socket.on("disconnect", () => {
      delete userSocketMap[userId];
    });
  });

  return io;
}

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

module.exports = { initializeSocketServer, getReceiverSocketId };
