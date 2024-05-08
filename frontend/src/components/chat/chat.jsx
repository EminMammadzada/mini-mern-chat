import classes from "./chat.module.css";
import { useChat } from "../../store/chatContext";
import useHttp from "../../hooks/useHttp";
import { useRef, useCallback } from "react";

import MessageBubble from "../message-bubble/message-bubble";
import { fetchAvailableConversationMessages } from "../../http";
import { useUser } from "../../store/userContext";

const ChatWindow = () => {
  const { selectedChat } = useChat();
  const { selectedUser } = useUser();
  const messageRef = useRef();
  const otherParticipant = selectedChat.otherParticipant;

  // Memoize fetch function
  const memoizedFetchConversations = useCallback(() => {
    return fetchAvailableConversationMessages(selectedChat.conversationId);
  }, [selectedChat.conversationId]);

  const {
    isFetching,
    fetchedData: availableConversationMessages,
    error,
  } = useHttp(memoizedFetchConversations, []);

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
        <h2>{otherParticipant}</h2>
        {/* TODO: include real last seen date */}
        <p>Last Seen: Yesterday at 10:30 PM</p>
      </header>
      {isFetching && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {availableConversationMessages &&
        availableConversationMessages.length > 0 && (
          <div className={classes.messages}>
            {availableConversationMessages.map((message) => (
              <MessageBubble
                key={message["_id"]}
                text={message.message}
                date={message.date}
                isSender={message.senderId == selectedUser.id}
              />
            ))}
          </div>
        )}
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
