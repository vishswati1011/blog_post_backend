const express = require("express")
const router = express.Router();
var loginExpert = require('../controller/expert/login')
var signupExpert = require('../controller/expert/signup')

router.use('/signup',signupExpert)
router.use('/login',loginExpert)

module.exports=router;
