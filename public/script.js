const socket = io("http://localhost:3000");
let userName = prompt("enter your name");
const form = document.getElementById('message-form');
const messageText = document.getElementById('message-text')
const messageContainer = document.getElementById('message-container');

socket.emit("user-connected",userName);
socket.on("user-connected",(name)=>{
    console.log(name+" joined");
})
console.log(userName);

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let text = messageText.value;
    socket.emit("message",text);
    messageText.value = '';
})

socket.on('message',(message)=>{
    let div = document.createElement('div')
    div.innerText = message;
    messageContainer.append(div);
})