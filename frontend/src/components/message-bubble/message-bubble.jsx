/* eslint-disable react/prop-types */
import classes from "./message-bubble.module.css";
import { formatDate } from "../../util/format-date";

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
