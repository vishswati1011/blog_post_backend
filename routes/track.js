const express = require("express")
const router = express.Router();
var {trackActivity} = require('../functions/trackActivity')

router.post('/',(req,res)=>{

        // console.log("track api",req.body);
        const response=trackActivity(req.body,function(updatedTrack){
                if(!updatedTrack[0]){
                        res.status(201).json({message:"Unable to update status",success:false})
                }else{
                        res.status(201).json({message:"Status updated succesffully",success:true,result:updatedTrack})
                }
        });

});

module.exports=router;
