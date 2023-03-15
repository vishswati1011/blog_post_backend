//db.js


const mongoose = require('mongoose')
require('dotenv').config();
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
const conn=mongoose.connect(process.env.MONGO_URL,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
module.exports=conn;
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});