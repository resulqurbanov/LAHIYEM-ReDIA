const io = require("socket.io")(8800, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let activeUsers = [];
  
  io.on("connection", (socket) => {
    // yeni user elave elemek
    socket.on("new-user-add", (newUserId) => {
      // elave olunmamis user
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      // yeni useri chat  elave
      io.emit("get-users", activeUsers);
    });
  
    socket.on("disconnect", () => {
      // aktivlikdern cixan user
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
// aktivleri goster     
 io.emit("get-users", activeUsers);
    });
  
    // basqa usere mesaj gonderme
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to :", receiverId)
      console.log("Data: ", data)
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }
    });
  });