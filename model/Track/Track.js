
const mongoose = require ('mongoose');
// const conn = require('../db')

const TrackActivity =new mongoose.Schema({
    VisitedDate:{
        type:Date,
        required:true,
    },
    UserID:{
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