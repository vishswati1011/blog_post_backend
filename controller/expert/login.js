const express = require("express")
const router = express.Router();
const Expert = require('../../model/expert/expert')
const jwt = require('jsonwebtoken')
router.post('/', function(req,res){

    const { expertEmail , expertPassword}= req.body;

    Expert.findOne({expertEmail},async (expertError,findExpert) => {

        if(!findExpert){
            res.status(200).send({success:false,message:"Expert user not exists"})
        }else{

            if(findExpert.expertEmail===expertEmail){
                if(findExpert.expertPassword===expertPassword)
                {
                    const data = {
                       expertId:findExpert._id, 
                       expertName: findExpert.expertName,
                       expertAddress:findExpert.expertAddress,
                       expertEmail:findExpert.expertEmail,
                    }
                    const token=jwt.sign(data,process.env.JWT_SECRET_KEY)
                    res.status(200).send({success:true,message:"Expert login successfull!",token:token})
                }else{
                    res.status(200).send({success:false,message:"Incorrect password"})
                }
            }
        }
    })
})

module.exports=router;
