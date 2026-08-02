const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(http);

app.use(express.static("public"));

let online = 0;

io.on("connection", (socket) => {
    online++;

    console.log("🟢 Пользователь подключился");

    // отправляем всем количество людей
    io.emit("online", online);


    socket.on("message", (data) => {
        io.emit("message", data);
    });


    socket.on("disconnect", () => {
        online--;

        console.log("🔴 Пользователь вышел");

        // обновляем количество
        io.emit("online", online);
    });
});


const PORT = process.env.PORT || 3000;

http.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Maxen запущен на порту ${PORT}`);
});
