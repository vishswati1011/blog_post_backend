const express = require("express")
const router = express.Router();
var loginExpert = require('../controller/business/login')
var signupExpert = require('../controller/business/signup')
var allBusiness = require('../controller/business/getAllBusinessUser')
router.use('/signup',signupExpert)
router.use('/login',loginExpert)
router.use('/allBusinessUser',allBusiness);

module.exports=router;