import classes from "./conversations.module.css";
import { useChat } from "../../store/chatContext";
import { conversations } from "../../dummy_data";

export default function Conversations() {
  const { setSelectedChat } = useChat();

  const handleConversationClick = (chatId) => {
    setSelectedChat(chatId);
  };

  return (
    <div className={classes.sidebar}>
      <h2>Your Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            onClick={() => handleConversationClick(conversation.id)}
            key={conversation.id}
          >
            {conversation.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
