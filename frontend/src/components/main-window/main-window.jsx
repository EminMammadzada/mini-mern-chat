import classes from "./main-window.module.css";

import Conversations from "../conversations/conversations";
import Chat from "../chat/chat";
import { useChat } from "../../store/chatContext";

export default function MainWindow() {
  const { selectedChat } = useChat();

  let content = (
    <div className={classes.fallback}>
      <p>No Chat Selected</p>
    </div>
  );

  if (selectedChat) {
    content = <Chat />;
  }

  return (
    <>
      <Conversations />
      {content}
    </>
  );
}
