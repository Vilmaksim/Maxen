const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("🟢 Пользователь подключился");

    socket.on("message", (msg) => {
        io.emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("🔴 Пользователь вышел");
    });
});

http.listen(3000, "0.0.0.0", () => {
    console.log("🚀 Maxen запущен: http://localhost:3000");
});
