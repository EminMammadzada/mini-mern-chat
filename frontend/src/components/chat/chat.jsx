import classes from "./chat.module.css";
import { conversations } from "../../dummy_data";
import { messages } from "../../dummy_data";

import { useChat } from "../../store/chatContext";
import { useRef } from "react";

import MessageBubble from "../message-bubble/message-bubble";

const ChatWindow = () => {
  const { selectedChat } = useChat();
  const messageRef = useRef();
  const username = conversations.find(
    (conversation) => conversation.id === selectedChat
  )["name"];

  const handleSendText = () => {
    const message = messageRef.current.value.trim();
    if (message) {
      console.log("Message sent: ", message);
      messageRef.current.value = "";
    }
  };

  return (
    <div className={classes.chat}>
      <header className={classes.header}>
        <h2>{username}</h2>
        <p>Last Seen: Yesterday at 10:30 PM</p>
      </header>
      <div className={classes.messages}>
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            text={message.message}
            isSender={message.isSender}
          />
        ))}
      </div>
      <div className={classes["new-message"]}>
        <textarea ref={messageRef} placeholder="Type your message..." />
        <button onClick={handleSendText}>
          <i className="fas fa-caret-right fa-3x"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
