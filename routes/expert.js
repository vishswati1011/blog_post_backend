const express = require("express")
const router = express.Router();
const {authJwt} = require('../middleware')
var loginExpert = require('../controller/expert/login')
var signupExpert = require('../controller/expert/signup')
var expertProfile = require('../controller/expert/expert.profile')
var allExpert = require('../controller/expert/getAllExpert')
router.use('/signup',signupExpert)
router.use('/login',loginExpert)
router.use('/expert_profile',authJwt.verifyToken,expertProfile)
router.use('/allExpert',authJwt.verifyToken,allExpert);

module.exports=router;
