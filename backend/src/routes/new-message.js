const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const Conversation = require("../models/conversation");

router.post("/api/messages", async (req, res) => {
  const { message, senderId, receiverId } = req.body;

  // Validate required fields
  if (!message || !senderId || !receiverId) {
    return res.status(400).json({
      error:
        "Missing required fields: message, senderId, and receiverId must be provided.",
    });
  }

  // save the message
  const newMessage = new Message({
    message: message,
    senderId: senderId,
    receiverId: receiverId,
  });

  try {
    await newMessage.save();
    // Save the message in the conversation
    let conversation = await Conversation.findOneAndUpdate(
      { participants: { $all: [senderId, receiverId] } },
      { $push: { messages: newMessage }, lastMessage: newMessage },
      { new: true, upsert: true } // Ensure conversation is created if it doesn't exist
    );
    return res
      .status(201)
      .json({ message: "Message and conversation updated successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports.newMessageRouter = router;
