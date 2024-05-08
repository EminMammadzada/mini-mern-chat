const mongoose = require("mongoose");
const app = require("./app");

const start = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chat");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Listening on Port 3000 - backend service");
  });
};

start();
