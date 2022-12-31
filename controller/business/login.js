const express = require("express")
const router = express.Router();
const Business = require('../../model/business/business')
const jwt = require('jsonwebtoken')
router.post('/', function(req,res){

    const { businessUEmail , businessUPassword}= req.body;

    Business.findOne({businessUEmail},async (businessError,findBusiness) => {

        if(!findBusiness){
            res.status(200).send({success:false,message:"business user not registered"})
        }else{

            if(findBusiness.businessUEmail===businessUEmail){
                if(findBusiness.businessUPassword===businessUPassword)
                {
                    const data = {
                       businessId:findBusiness._id, 
                       businessUName: findBusiness.businessUName,
                       businessUAddress:findBusiness.businessUAddress,
                       businessUEmail:findBusiness.businessUEmail,
                    }
                    const token=jwt.sign(data,process.env.JWT_SECRET_KEY)
                    res.status(200).send({success:true,message:"business login successfull!",token:token})
                }else{
                    res.status(200).send({success:false,message:"Incorrect password"})
                }
            }
        }
    })
})

module.exports=router;
