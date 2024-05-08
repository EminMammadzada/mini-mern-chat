const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/api/users", async (req, res) => {
  const users = await User.find({});
  return res.status(200).json({ users });
});

module.exports.getUsersRouter = router;
