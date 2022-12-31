const express = require("express");
const router = express.Router();
const fs= require('fs');
const path = require("path");
const Expert = require('../../model/expert/expert')
const upload = require('../../middleware/upload')

router.post("/",upload.single("file"),async(req,res)=>{

    const {exportEmail} = req.body;
    console.log(req.file,"request")
    var exportImage = {
        // data:fs.readFileSync(path.join(__dirname+'/file/'+req.file.filename)),
        data:`http://localhost:8080/file/${req.file.filename}`,
        contentType:'image/png'
    }
    Expert.updateOne({exportEmail},{$set :{exportImage,imgId:req.file.id}},(updateErr,updateResult)=>{
        if(updateErr){
            res.status(201).send({success:false,message:"Error in update image"})
        }else{
            console.log(updateResult,"updateResult");

        }
    })

})
module.exports=router;