const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { Server } = require("socket.io");

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('./views'))
app.set('view engine', 'ejs');

let rooms = {};

app.get('/',(req,res)=>{
    // res.sendFile(path.join(__dirname+"/../public/index.html"));
    res.render('chatrooms',{rooms:rooms})
})

app.get('/:room',(req,res)=>{
    // res.sendFile(path.join(__dirname+"/../public/index.html"));
    if(req.params.room == null){
        res.redirect('/');
    }
    res.render('index',{room:req.params.room})
})

app.post('/room',(req,res)=>{
    if(rooms[req.body.room] != null){
        res.redirect('/');
    }
    rooms[req.body.room] = {users:{}};
    res.redirect(req.body.room);
})

const server = app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running");
})

const io = new Server(server);

io.on('connection',(socket)=>{
    console.log(socket.id+" connected");

    socket.on("user-connected",(room,name)=>{
        console.log(room);
        rooms[room].users[socket.id] = name;
        console.log(rooms[room].users[socket.id]);
        console.log(name);
        socket.join(room);
        socket.to(room).emit("user-connected",name);
    })

    socket.on("message",(room,message)=>{
        socket.to(room).emit("message",message,rooms[room].users[socket.id]);
    })

    socket.on("room-added",(room)=>{
        socket.broadcast.emit("room-added",room);
    })
    
});

server.on("error", (error) => {
    console.error("Server error: ", error);
  });