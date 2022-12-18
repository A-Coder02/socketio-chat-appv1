const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const cors = require("cors");

const router = require("./router");

const { addUser, getUser } = require("./users");

app.use(
  cors({
    origin: "*",
  })
);
app.use("/", router);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (data, callback) => {
    const { name, room } = data;
    console.log("data : ", data);
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) callback({ error });

    socket.join(room);

    socket.emit("message", {
      user: "admin",
      text: `${name}, welcome to the room ${room}`,
    });
    socket.broadcast.to(room).emit("message", {
      user: "admin",
      text: `${name} has joined`,
    });

    socket.on("sendMessage", (message) => {
      console.log("reciever");
      socket.broadcast.to(room).emit("message", {
        user: name,
        text: name + ": " + message,
      });
      socket.emit("message", {
        user: name,
        text: name + ": " + message,
      });
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log("recieved message : ", message);
  });

  socket.on("disconnect", () => {
    console.log("User had left!");
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
