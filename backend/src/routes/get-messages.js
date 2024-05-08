const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const Conversation = require("../models/conversation");

router.get("/api/conversations/:conversationId/messages", async (req, res) => {
  const { conversationId } = req.params;
  const messages = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Message",
  });
  return res.status(200).json({ messages });
});

module.exports.getMessageRouter = router;
