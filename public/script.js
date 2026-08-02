const socket = io();


const nicknameInput = document.getElementById("nickname");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");
const chat = document.getElementById("chat");

const onlineText = document.getElementById("online");
const typingText = document.getElementById("typing");

const emojiButton = document.getElementById("emoji");
const emojiPanel = document.getElementById("emojiPanel");


// Ник

nicknameInput.value = localStorage.getItem("nickname") || "";

nicknameInput.addEventListener("input", () => {
    localStorage.setItem("nickname", nicknameInput.value);
});



// Отправка

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



// Получение сообщений

socket.on("message", (data) => {

    const myNickname = nicknameInput.value.trim();

    let side = "message other";

    if (data.nickname === myNickname) {
        side = "message mine";
    }


    chat.innerHTML += `
        <div class="${side}">
            <div class="name">${data.nickname}</div>
            <div class="text">${data.text}</div>
        </div>
    `;


    chat.scrollTop = chat.scrollHeight;

});



// Онлайн

socket.on("online", (count) => {

    onlineText.innerHTML = `🟢 Онлайн: ${count}`;

});



// Печатает

let typingTimer;


messageInput.addEventListener("input", () => {

    let nickname = nicknameInput.value || "Гость";

    socket.emit("typing", nickname);


    clearTimeout(typingTimer);


    typingTimer = setTimeout(() => {

        socket.emit("stopTyping");

    }, 1000);

});



socket.on("typing", (nickname) => {

    typingText.innerHTML = `${nickname} печатает...`;

});


socket.on("stopTyping", () => {

    typingText.innerHTML = "";

});



// Эмодзи

emojiButton.onclick = () => {

    if (emojiPanel.style.display === "block") {

        emojiPanel.style.display = "none";

    } else {

        emojiPanel.style.display = "block";

    }

};



emojiPanel.addEventListener("click", (event) => {

    if (event.target.tagName === "SPAN") {

        messageInput.value += event.target.textContent;

    }

});
