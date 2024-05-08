/* eslint-disable react/prop-types */
import classes from "./message-bubble.module.css";

const MessageBubble = ({ text, isSender }) => {
  return (
    <div
      className={`${classes["message-bubble"]} ${
        isSender ? classes["sender"] : classes["receiver"]
      }`}
    >
      {text}
    </div>
  );
};

export default MessageBubble;
