const express = require("express");
const router = express.Router();

router.post("/api/messages", (req, res) => {
  return res.status(201).json({ message: "created a new message" });
});

module.exports.newMessageRouter = router;
