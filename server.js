const express = require("express");
const cors = require("cors");
const db = require('./db');
const business = require("./routes/business");
const expert = require("./routes/expert");
const app = express();
const http = require("http").createServer(app);
const {trackActivity} = require('./functions/trackActivity')
require('dotenv').config();

var corsOptions = {
    origin: "http://localhost:8000"
  };
  
  app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use('/',(req,res)=>{
    res.json({message:"backend"})
})


app.use('/expert',expert)
app.use('/business',business)
//    socket code start here

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let interval;

// console.log(io,"io")
// io.on("connection", (socket) => {
//   console.log("connection made",socket);

//     socket.on("update_status",(data)=>{

//       console.log(data)

//     })

    
//     console.log("New client connected");
//     if (interval) {
//       clearInterval(interval);
//     }
//     interval = setInterval(() => getApiAndEmit(socket), 1000);
//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//       clearInterval(interval);
//     });
  

// });

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

      socket.on("update_status",(data)=>{

      console.log(data)

    })
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});


app.listen(PORT,()=> {
    console.log(`server listening to port ${PORT}`)
})