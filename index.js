const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { Server } = require("socket.io");
const chatRouter = require("./routers/chatRouter")

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/',chatRouter);

const server = app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running");
})

const io = new Server(server);

io.on('connection',(socket)=>{
    console.log(socket.id+" connected");
});

server.on("error", (error) => {
    console.error("Server error:", error);
  });