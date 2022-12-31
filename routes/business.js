const express = require("express")
const router = express.Router();
var loginExpert = require('../controller/business/login')
var signupExpert = require('../controller/business/signup')

router.use('/signup',signupExpert)
router.use('/login',loginExpert)
module.exports=router;