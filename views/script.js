const socket = io('https://chat-5ghn.onrender.com');
const form = document.getElementById('message-form');
const addForm = document.getElementById('add-form');
const messageText = document.getElementById('message-text')
const roomName = document.getElementById('room-name')
const messageContainer = document.getElementById('message-container');
const roomContainer = document.getElementById('room-container');

if(messageContainer != null){
    let userName = prompt("enter your name");
    socket.emit("user-connected",room,userName);
    console.log(userName);
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        let text = messageText.value;
        socket.emit("message",room,text);
        appendMessage('my-message',messageText.value);
        messageText.value = '';
        window.scrollTo(0, document.body.scrollHeight);
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
    div.classList.add('card');
    div.innerHTML = room+"</br>";
    let a = document.createElement('a');
    a.href = `/${room}`
    a.innerText = 'Join'
    div.append(a);
    roomContainer.append(div);
})

socket.on("user-connected",(name)=>{
    let div = document.createElement('div');
    div.classList.add('join');
    div.innerText = `${name} joined`;
    messageContainer.append(div);
})

socket.on('message',(message,name)=>{
    appendMessage('other-message',name+": "+message);
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
