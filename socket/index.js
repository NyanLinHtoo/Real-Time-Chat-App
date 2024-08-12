const { Server } = require("socket.io");

const io = new Server({
  cors: "*",
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("Socket Id=>", socket.id);

  // listen to a connection
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      userId !== null &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    console.log("OnlineUsers====", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  // send message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    console.log("Message Reci", message.senderId);

    if (user) {
      console.log("I am in user");

      io.to(user.socketId).emit("getMessage", message);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3000);
