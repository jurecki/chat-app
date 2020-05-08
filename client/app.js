const socket = io();
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
let userName = '';

socket.on('message', ({ author, content }) => addMessage(author, content))
socket.on('newUser', ({ author, content }) => chatBotMessage(author, content))

function chatBotMessage(author, content) {
    const message = document.createElement('li');
    message.setAttribute('class', 'message message--received');
    author === userName ?
        message.setAttribute('class', 'message message--received message--self') :
        message.setAttribute('class', 'message message--received');
    message.innerHTML = `<h3 class="message__author">${author === userName ? 'You' : author}</h3>
        <div class="chatBotMessage__content">
            ${content}
        </div>`;
    messagesList.appendChild(message)
}

function login() {
    event.preventDefault(event);
    if (userNameInput.value === "") {
        window.alert('You have to input your name')
    } else {
        userName = userNameInput.value;
        socket.emit('join', { name: userName, id: socket.id })
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }

}

function sendMessage() {
    event.preventDefault();
    let messageContent = messageContentInput.value;

    if (messageContentInput.value === "") {
        window.alert('You have to input some message')
    } else {
        addMessage(userName, messageContent);
        socket.emit('message', { author: userName, content: messageContent })
        messageContentInput.value = '';
    }
}

function addMessage(author, content) {

    const message = document.createElement('li');
    message.setAttribute('class', 'message message--received');
    author === userName ?
        message.setAttribute('class', 'message message--received message--self') :
        message.setAttribute('class', 'message message--received');
    message.innerHTML = `<h3 class="message__author">${author === userName ? 'You' : author}</h3>
    <div class="message__content">
        ${content}
    </div>`;
    messagesList.appendChild(message)
}

loginForm.addEventListener('submit', login)

addMessageForm.addEventListener('submit', sendMessage)