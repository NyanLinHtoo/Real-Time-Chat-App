const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const { initializeSocket } = require("./socketConnection");
const user_Route = require("./routes/userRoute");
const chat_Route = require("./routes/chatRoute");
const message_Route = require("./routes/messageRoute");

const app = express();
const port = process.env.PORT;
connectDb();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/users", user_Route);
app.use("/api/chats", chat_Route);
app.use("/api/messages", message_Route);

const httpServer = createServer(app);

// Initialize Socket.IO
initializeSocket(httpServer);

httpServer.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
