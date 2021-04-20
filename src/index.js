const express = require("express");
const path = require("path");
const sokectIo = require("socket.io");
const app = express();

const messages = [];
app.use("/", express.static(path.join(__dirname, "public")));

const server = app.listen(3333);

const io = sokectIo(server);

io.on("connection", (socket) => {
  console.log("new connection");
  io.emit("update_messages", messages);
  socket.on("new_message", (data) => {
    messages.push(data.msg);
    console.log(messages);
    io.emit("update_messages", messages);
  });
});
