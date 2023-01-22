const express = require("express")
const router = express.Router();
const {authJwt} = require("../middleware")
var loginExpert = require('../controller/business/login')
var signupExpert = require('../controller/business/signup')
var allBusiness = require('../controller/business/getAllBusinessUser')
router.use('/signup',signupExpert)
router.use('/login',loginExpert)
router.use('/allBusinessUser',authJwt.verifyToken,allBusiness);

module.exports=router;