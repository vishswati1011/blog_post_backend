
const mongoose = require ('mongoose');
// const conn = require('../db')

const TrackActivity =new mongoose.Schema({
    VisitedDate:{
        type:String,
        required:true,
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "expert"
    },
    VisitedPages:{
        type:Array,
    }
    
},{
    timestamps: true
})

module.exports =mongoose.model("TrackActivity",TrackActivity);