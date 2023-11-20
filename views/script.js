// const socket = io('https://chat-5ghn.onrender.com');
const socket = io('http://localhost:3000/');
const form = document.getElementById('message-form');
const addForm = document.getElementById('add-form');
const messageText = document.getElementById('message-text')
const roomName = document.getElementById('room-name')
const messageContainer = document.getElementById('message-container');
const roomContainer = document.getElementById('room-container');
const topContainer = document.getElementById('top-container');
const typingblock = document.getElementById('typing');

if(messageContainer != null){
    let userName = prompt("enter your name");
    socket.emit("user-connected",room,userName);
    console.log(userName);
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        let text = messageText.value;
        socket.emit("message", room, text);
        appendMessage('my-message',messageText.value);
        messageText.value = '';
        topContainer.scrollTo(0, document.body.scrollHeight);
    })
    
    messageText.addEventListener('input',()=>{
        socket.emit("typing",userName,room)
    })
}

if(roomContainer != null){
    addForm.addEventListener('submit',(e)=>{
        socket.emit('room-added',roomName.value);
        console.log(roomName.value);
    })
}

socket.on('room-added',(room)=>{
    let div = document.createElement('div');
    div.classList.add('card','room-card','mb-2');
    div.innerHTML = room+"</br>";
    let a = document.createElement('a');
    let span = document.createElement('span');
    span.classList.add('badge', 'text-bg-primary');
    span.innerText = 'Join'
    a.href = `/${room}`
    a.append(span);
    div.append(a);
    roomContainer.append(div);
})

socket.on("user-connected",(name)=>{
    let div = document.createElement('div');
    div.classList.add('join');
    div.innerText = `${name} joined`;
    messageContainer.append(div);
    topContainer.scrollTo(0, document.body.scrollHeight);
})

socket.on('message',(message,name)=>{
    typingblock.style.display = "none";
    appendMessage('other-message',name+": "+message);
    topContainer.scrollTo(0, document.body.scrollHeight);
})

socket.on("typing",(userName)=>{
    typingblock.style.display = 'block';
    setTimeout(()=>{
        typingblock.style.display = 'none';
    },5000);
})

function appendMessage(className,message){
    let div = document.createElement('div');
    div.classList.add((className == "other-message")?"o-message":'message');
    let messageDiv = document.createElement('div');
    messageDiv.classList.add(className);
    messageDiv.innerText = message;
    div.append(messageDiv);
    messageContainer.append(div);
}
