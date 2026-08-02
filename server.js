const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("🟢 Пользователь подключился");

    socket.on("message", (data) => {
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("🔴 Пользователь вышел");
    });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Maxen запущен на порту ${PORT}`);
});
