const express = require("express");
const mongoose = require("mongoose");
const Conversation = require("../models/conversation");

const router = express.Router();

router.get("/api/users/:userId/conversations", async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await Conversation.find({
      participants: userId,
    }).populate({
      path: "participants",
      model: "User",
    });
    // Filter out and structure the results to only include other participants' names
    const results = conversations.map((conversation) => {
      const { participants } = conversation;
      // Filter out the current user's ID and return only other participants' names
      const otherParticipant = participants.filter(
        (participant) => participant._id.toString() !== userId.toString()
      );
      return {
        conversationId: conversation._id,
        otherParticipant,
      };
    });
    return res.status(200).json({ conversations: results });
  } catch (error) {
    console.log("Something went wrong: ,", error);
  }
});

module.exports.getConversationsRouter = router;
