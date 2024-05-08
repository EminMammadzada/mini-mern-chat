/* eslint-disable react/prop-types */
import classes from "./message-bubble.module.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {
    timeStyle: "short",
  })}`;
};

const MessageBubble = ({ text, isSender, date }) => {
  return (
    <div
      className={`${classes["message-bubble"]} ${
        isSender ? classes["sender"] : classes["receiver"]
      }`}
    >
      <div className={classes["message-content"]}>{text}</div>
      <div className={classes["message-timestamp"]}>{formatDate(date)}</div>
    </div>
  );
};

export default MessageBubble;
