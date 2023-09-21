const socket = io("http://localhost:3000");
let userName = prompt("enter your name");
const form = document.getElementById('message-form');
const messageText = document.getElementById('message-text')
const messageContainer = document.getElementById('message-container');

socket.emit("user-connected",userName);
socket.on("user-connected",(name)=>{
    let div = document.createElement('div');
    div.classList.add('join');
    div.innerText = `${name} joined`;
    messageContainer.append(div);
})
console.log(userName);

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let text = messageText.value;
    socket.emit("message",text);
    appendMessage('my-message',messageText.value);
    messageText.value = '';
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('message',(message)=>{
    appendMessage('other-message',message);
})

function appendMessage(className,message){
    let div = document.createElement('div');
    div.classList.add('message');
    let messageDiv = document.createElement('div');
    messageDiv.classList.add(className);
    messageDiv.innerText = message;
    div.append(messageDiv);
    messageContainer.append(div);
}