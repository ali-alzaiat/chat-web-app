const express = require('express');
var path = require('path');
const chatRouter = express.Router();

chatRouter.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+"/../index.html"));
})

module.exports = chatRouter;