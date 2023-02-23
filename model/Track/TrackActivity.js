
const mongoose = require ('mongoose');
// const conn = require('../db')

const TrackActivity =new mongoose.Schema({
    VisitedDate:{
        type:String,
        required:true,
    },
    TrackData:[
        {
            UserId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "expert"
            },
            VisitedPages:[
                {
                    pagename :{
                        type:String
                    },
                    visitedtime:{
                        hours:{type:Number},
                        min:{type:Number},
                        sec:{type:Number}
                    }
                }
            ]
        }
    ]
   
},{
    timestamps: true
})

module.exports =mongoose.model("TrackActivity",TrackActivity);