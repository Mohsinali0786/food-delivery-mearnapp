const express =require('express')
const router = express.Router()
// const { body, validationResult } = require('express-validator');
const {Signup,UserLogin,getAllUser} = require('..//controllers/authController')

router.post('/signUp', Signup)
router.post('/signIn', UserLogin)


// GET Routes
router.get('/getAllUsers', getAllUser)





module.exports=router
