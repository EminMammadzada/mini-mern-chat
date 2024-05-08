const express = require("express");
const bodyParser = require("body-parser");
const { newMessageRouter } = require("./routes/new-message");
const { getMessageRouter } = require("./routes/get-messages");
const { getUsersRouter } = require("./routes/get-users");
const cors = require("cors");
const { getConversationsRouter } = require("./routes/get-conversations");

const app = express();

app.set("trust proxy", true);
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use(newMessageRouter);
app.use(getMessageRouter);
app.use(getConversationsRouter);
app.use(getUsersRouter);

module.exports = app;
