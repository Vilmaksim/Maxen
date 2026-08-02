const socket = io();

const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");

function sendMessage() {
    const text = input.value;

    if (text !== "") {
        socket.emit("message", text);
        input.value = "";
    }
}

socket.on("message", (msg) => {
    const p = document.createElement("p");
    p.textContent = msg;
    messages.appendChild(p);
});