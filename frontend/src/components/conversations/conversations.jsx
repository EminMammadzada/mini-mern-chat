import { useCallback } from "react";
import classes from "./conversations.module.css";
import { useChat } from "../../store/chatContext";
import { useUser } from "../../store/userContext";
import useHttp from "../../hooks/useHttp";
import { fetchAvailableConversations } from "../../http";

export default function Conversations() {
  const { selectedUser } = useUser();
  const { setSelectedChat } = useChat();

  // Memoize fetch function
  const memoizedFetchConversations = useCallback(() => {
    return fetchAvailableConversations(selectedUser.id);
  }, [selectedUser.id]);

  const {
    isFetching,
    fetchedData: availableConversations,
    error,
  } = useHttp(memoizedFetchConversations, []);

  const handleConversationClick = (conversationId) => {
    setSelectedChat(conversationId);
  };

  return (
    <div className={classes.sidebar}>
      <h2>Your Conversations, {selectedUser.username}</h2>
      {isFetching && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {availableConversations && availableConversations.length > 0 && (
        <ul>
          {availableConversations.map((conversation) => (
            <li
              onClick={() =>
                handleConversationClick(conversation.conversationId)
              }
              key={conversation.conversationId}
            >
              {conversation.otherParticipant}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
