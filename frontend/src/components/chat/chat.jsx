import classes from "./chat.module.css";
import { useChat } from "../../store/chatContext";
import { useSocket } from "../../store/socketContext";
import useHttp from "../../hooks/useHttp";
import { useRef, useCallback, useEffect } from "react";

import MessageBubble from "../message-bubble/message-bubble";
import { fetchAvailableConversationMessages, sendMessage } from "../../http";
import { useUser } from "../../store/userContext";

const ChatWindow = () => {
  const { selectedChat } = useChat();
  const { selectedUser } = useUser();
  const { socket } = useSocket();
  const messageRef = useRef();
  const otherParticipant = selectedChat.otherParticipant[0];
  // Memoize fetch function
  const memoizedFetchConversations = useCallback(() => {
    return fetchAvailableConversationMessages(selectedChat.conversationId);
  }, [selectedChat.conversationId]);

  const memoizedSendMessage = useCallback(() => {
    return sendMessage(
      selectedUser.id,
      otherParticipant.id,
      messageRef.current.value
    );
  }, [selectedUser, otherParticipant]);

  const {
    isFetching,
    fetchedData: availableConversationMessages,
    error,
    setFetchedData: setAvailableConversationMessages,
    executeFetch: executeGetMessages,
  } = useHttp(memoizedFetchConversations, []);

  const { error: sendError, executeFetch } = useHttp(memoizedSendMessage, []);

  const handleSendText = () => {
    const message = messageRef.current.value.trim();
    if (message) {
      executeFetch();
      messageRef.current.value = "";
    }
  };

  useEffect(() => {
    executeGetMessages();
    if (socket == null) {
      return;
    }

    socket.on("newMessage", (message) => {
      setAvailableConversationMessages((prevMessages) => [
        ...prevMessages,
        message,
      ]);
    });

    return () => socket.off("newMessage");
  }, [executeGetMessages, socket, setAvailableConversationMessages]);

  return (
    <div className={classes.chat}>
      <header className={classes.header}>
        <h2>{otherParticipant.username}</h2>
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
      {sendError && (
        <div>
          Something went wrong when sending the message {sendError.message}
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
