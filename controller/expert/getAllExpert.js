const express = require("express");
const router = express.Router();
const Expert = require('../../model/expert/expert')
router.get('/',async (req,res)=>{

    Expert.find({},{expertPassword:0,exportImage:0},async(error,findExpert)=>{
        if(!findExpert){
            res.status(201).send({success:false,message:'no expert found'})
        }else{
            res.status(200).send({success:true,allExpert:findExpert})
        }
    })

})
module.exports =router;