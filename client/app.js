const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

function login() {
    event.preventDefault(event);
    if (userNameInput.value === "") {
        window.alert('You have to input your name')
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }

}

function sendMessage() {
    event.preventDefault();
    if (messageContentInput.value === "") {
        window.alert('You have to input some message')
    } else {
        addMessage(userName, messageContentInput.value)
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