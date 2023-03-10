
const mongoose = require ('mongoose');
// const conn = require('../db')

const expert =new mongoose.Schema({
    expertName:{
        type:String,
        required:true,
    },
    expertAddress:{
        type:String,
        required:false,
    },
    expertMobileNo:{
        type:String,
        required:true
    },
    expertEmail:{
        type:String,
        required:true,
    },
    expertPassword:{
        type:String,
        required:true,
    },
    exportImage:{
        data:Buffer,
        contentType:String
    },
    expertActive:{
        type:Boolean,
        required:false
    },
    imgId:{
        type:String,
    },
    expertLoginTime:{
        type:Date,
        required:true
    }
},{
    timestamps: true
})

module.exports =mongoose.model("Expert",expert);