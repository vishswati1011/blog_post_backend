
const mongoose = require ('mongoose');
// const conn = require('../db')

const business =new mongoose.Schema({
    businessUName:{
        type:String,
        required:true,
    },
    businessUAddress:{
        type:String,
        required:false,
    },
    businessUMobileNo:{
        type:String,
        required:true
    },
    businessUEmail:{
        type:String,
        required:true,
    },
    businessUPassword:{
        type:String,
        required:true,
    },
    businessImage:{
        data:Buffer,
        contentType:String
    },
    businessActive:{
        type:Boolean,
        required:false
    },
    businessLoginTime:{
        type:Date,
        required:true
    }
},{
    timestamps: true
})

module.exports =mongoose.model("Business",business);