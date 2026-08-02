const socket = io();

const nicknameInput = document.getElementById("nickname");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");
const chat = document.getElementById("chat");


// Загружаем сохранённый ник
nicknameInput.value = localStorage.getItem("nickname") || "";


// Сохраняем ник
nicknameInput.addEventListener("input", () => {
    localStorage.setItem("nickname", nicknameInput.value);
});


// Отправка сообщения
sendButton.onclick = () => {

    const nickname = nicknameInput.value.trim();
    const text = messageInput.value.trim();

    if (!nickname) {
        alert("Введите ник!");
        return;
    }

    if (!text) {
        return;
    }

    socket.emit("message", {
        nickname: nickname,
        text: text
    });

    messageInput.value = "";
};


// Получение сообщения
socket.on("message", (data) => {

    chat.innerHTML += `
        <p>
            <b>${data.nickname}:</b> ${data.text}
        </p>
    `;

    chat.scrollTop = chat.scrollHeight;
});
