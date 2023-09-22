const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { Server } = require("socket.io");
const chatRouter = require("./routers/chatRouter")

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/',chatRouter);
app.use(express.static('./public'))

let users = {};


const server = app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running");
})

const io = new Server(server);

io.on('connection',(socket)=>{
    console.log(socket.id+" connected");

    socket.on("user-connected",(name)=>{
        users[socket.id] = name;
        console.log(name);
        socket.broadcast.emit("user-connected",users[socket.id]);
    })

    socket.on("message",(message)=>{
        socket.broadcast.emit("message",message);
    })
    
});

server.on("error", (error) => {
    console.error("Server error: ", error);
  });