const express = require("express");
const cors = require("cors");
const db = require('./db');
const business = require("./routes/business");
const expert = require("./routes/expert");
const app = express();
require('dotenv').config();

var corsOptions = {
    origin: "http://localhost:8000"
  };
  
  app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;
app.use(express.json());
// app.use('/',(req,res)=>{
//     res.json({message:"backend"})
// })
app.use('/expert',expert)
app.use('/business',business)
app.listen(PORT,()=> {
    console.log(`server listening to port ${PORT}`)
})