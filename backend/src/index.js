const mongoose = require("mongoose");
const { httpServer } = require("./app");

const start = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chat");
    httpServer.listen(3000);
  } catch (err) {
    console.log(err);
  }
};

start();
