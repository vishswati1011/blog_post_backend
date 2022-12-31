const express = require("express");

const db = require('./db');
const expert = require("./routes/expert");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
app.use(express.json());
// app.use('/',(req,res)=>{
//     res.json({message:"backend"})
// })
app.use('/expert',expert)
app.listen(PORT,()=> {
    console.log(`server listening to port ${PORT}`)
})