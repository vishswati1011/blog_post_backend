const express = require("express")
const router = express.Router();
const Expert = require('../../model/expert/expert')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const config = require('../../config/auth.config')

router.post('/', function(req,res){

    const { expertEmail , expertPassword}= req.body;
  console.log("login api called",req.body)
    Expert.findOne({expertEmail},async (expertError,findExpert) => {

        if(!findExpert){
            res.status(200).send({success:false,message:"Expert Not Found."})
        }else{

            // var passwordIsValid = bcrypt.compareSync(
            //     req.body.expertPassword,
            //     findExpert.expertPassword
            //   );
        
            if(!expertPassword===findExpert.expertPassword)
            {
             
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
              }
        
                    const data = {
                       expertId:findExpert._id, 
                       expertName: findExpert.expertName,
                       expertAddress:findExpert.expertAddress,
                       expertEmail:findExpert.expertEmail,
                    }
                    const token=jwt.sign(data,config.secret,{
                        expiresIn:86400  //24 hours
                    })

                    res.status(200).send({success:true,message:"Expert login successfull!",token:token})
            
        }
    })
})

module.exports=router;
