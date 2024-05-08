const mongoose = require("mongoose");
const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversation");

mongoose.connect("mongodb://127.0.0.1:27017/chat");

async function createUsers() {
  const usernames = ["Alice", "Bob", "Charlie", "David", "Eve"];
  const users = usernames.map((username) => new User({ username }));
  return await User.insertMany(users);
}

async function createMessages(sender, receiver) {
  const messages = [];
  for (let i = 0; i < 3; i++) {
    // Creating 3 messages per conversation
    const message = new Message({
      message: `Hello ${i + 1}, from ${sender.username} to ${
        receiver.username
      }`,
      senderId: sender._id,
      receiverId: receiver._id,
    });
    await message.save();
    messages.push(message);
  }
  return messages;
}

async function createConversations(users) {
  let conversations = [];

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const messages = await createMessages(users[i], users[j]);
      const conversation = new Conversation({
        participants: [users[i]._id, users[j]._id],
        messages: messages.map((message) => message._id),
        lastMessage: messages[messages.length - 1]._id,
      });
      await conversation.save();
      conversations.push(conversation);
    }
  }
  return conversations;
}

async function populateDatabase() {
  await mongoose.connection.dropDatabase();
  const users = await createUsers();
  await createConversations(users);
  console.log("Database has been populated with users and conversations!");
  mongoose.disconnect();
}

populateDatabase().catch(console.error);
