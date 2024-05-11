const express = require("express");
const bodyParser = require("body-parser");
const { newMessageRouter } = require("./routes/new-message");
const { getMessageRouter } = require("./routes/get-messages");
const { getUsersRouter } = require("./routes/get-users");
const cors = require("cors");
const { getConversationsRouter } = require("./routes/get-conversations");
const http = require("http");
const { initializeSocketServer } = require("./socket/socket");

const app = express();
const httpServer = http.createServer(app);

app.set("trust proxy", true);
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use(newMessageRouter);
app.use(getMessageRouter);
app.use(getConversationsRouter);
app.use(getUsersRouter);

const io = initializeSocketServer(httpServer);
app.set("io", io);

module.exports.httpServer = httpServer;
