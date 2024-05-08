const express = require("express");
const router = express.Router();

router.get("/api/messages", (req, res) => {
  return res.status(200).json({ message: "got messages" });
});

module.exports.getMessageRouter = router;
