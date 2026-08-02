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



// Отправка сообщения

sendButton.onclick = () => {

    const nickname = nicknameInput.value.trim();
    const text = messageInput.value.trim();


    if (!nickname) {
        alert("Enter nickname");
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

    let side = "other";

    if (data.id === socket.id) {
    side = "mine";
}


    chat.innerHTML += `
        <div class="message ${side}">

            <div class="name">
                ${data.nickname}
            </div>

            <div class="text">
                ${data.text}
            </div>

        </div>
    `;


    chat.scrollTop = chat.scrollHeight;

});



// Онлайн

socket.on("online", (count) => {

    onlineText.innerHTML = `🟢 Online: ${count}`;

});



// Печатает

let typingTimer;


messageInput.addEventListener("input", () => {

    const nickname = nicknameInput.value || "Guest";

    socket.emit("typing", nickname);


    clearTimeout(typingTimer);


    typingTimer = setTimeout(() => {

        socket.emit("stopTyping");

    }, 1000);

});


socket.on("typing", (nickname) => {

    typingText.innerHTML = `${nickname} is typing...`;

});


socket.on("stopTyping", () => {

    typingText.innerHTML = "";

});



// Emoji

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
