const express = require("express");
const cors = require("cors");
const db = require('./db');
const business = require("./routes/business");
const expert = require("./routes/expert");
const track= require("./routes/track")
const app = express();
const socketio = require("socket.io")
const {trackActivity} = require('./functions/trackActivity')
require('dotenv').config();

var corsOptions = {
    origin: "http://localhost:3000"
  };
  
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;
app.use(express.json());
// app.use('/',(req,res)=>{
//     res.json({message:"backend"})
// })


app.use('/expert',expert)
app.use('/business',business)
app.use("/track",track)
const server= app.listen(PORT,()=> {
  console.log(`server listening to port ${PORT}`)
})
const http = require("http").createServer(server);

// const io = socketio(server)

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

      socket.on("update_status",(data)=>{

      console.log(data)
      trackActivity(data,function(responses){
        console.log("response",responses)
      });
    })
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});


