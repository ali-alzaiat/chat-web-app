const socket = io("http://localhost:3000");
let userName = prompt("enter your name");
socket.emit("user-connected",userName);
socket.on("user-connected",(name)=>{
    console.log(name+" joined");
})
console.log(userName);