const express = require("express")
const router = express.Router();
const Business = require('../../model/expert/expert')
router.post('/', function(req,res){
    const { expertName,expertAddress,
        expertMobileNo, expertEmail,
        expertPassword} = req.body;

    console.log("signup")
    Expert.findOne({expertEmail:expertEmail},async (err,findExpert) => {
        if(findExpert){
            res.status(200).json({success:false,message:"Expert with this email already registered"});
        }else{
            var date = new Date()
            const expertData = {
                expertName,
                expertAddress,
                expertMobileNo,
                expertEmail,
                expertPassword,
                expertLoginTime:date
            }
            var expert = new Expert(expertData);
            expert.save().then((response)=>{
                res.status(200).json({success:true,result:response,message:"Expert register successfull"});
            }).catch((error)=>console.error())
        }
    })

})

module.exports=router;
