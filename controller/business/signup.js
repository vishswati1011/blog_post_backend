const express = require("express")
const router = express.Router();
const Business = require('../../model/business/business')
router.post('/', function(req,res){
    const { businessUName,
        businessUAddress,
        businessUMobileNo,
        businessUEmail,
        businessUPassword,} = req.body;

    Business.findOne({businessUEmail},async (err,findBusiness) => {
        if(findBusiness){
            res.status(200).json({success:false,message:"Business with this email already registered"});
        }else{
            var date = new Date()
            const businessData = {
               businessUName,
               businessUAddress,
               businessUMobileNo,
               businessUEmail,
               businessUPassword,
               businessLoginTime:date
            }
            
            var business = new Business(businessData);

            business.save().then((response)=>{
                res.status(200).json({success:true,message:"Business user register successfull"});
            }).catch((error)=>console.log("error",error))
        }
    })

})

module.exports=router;
