const express = require("express");
const router = express.Router();
const Business = require('../../model/business/business')
router.get('/',async (req,res)=>{

    Business.find({},{businessUPassword:0},async(error,findBusiness)=>{
        if(!findBusiness){
            res.status(201).send({success:false,message:'no Business found'})
        }else{
            res.status(200).send({success:true,allBusiness:findBusiness})
        }
    })

})
module.exports =router;