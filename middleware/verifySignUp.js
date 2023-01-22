const Expert = require('../model/expert/expert')

checkduplicateExpert =( req,res,next) => {
    Expert.findOne({
        Email:req.body.email
    }).exec((err,user) => {
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(user){
            res.status(400).send({message :"Failed! Username is already in use!"});
            return;
        }

        next();
    })
}

const verifySignUp = {
    checkduplicateExpert
}

module.exports=verifySignUp;