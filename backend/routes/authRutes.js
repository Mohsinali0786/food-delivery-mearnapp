const express =require('express')
const router = express.Router()
// const { body, validationResult } = require('express-validator');
const {Signup,UserLogin,getAllUser,UserUpdate, UserDelete} = require('..//controllers/authController')

router.patch('/signUp', Signup)
router.patch('/signIn', UserLogin)


// GET Routes
router.get('/getAllUsers', getAllUser)

router.patch('/updateUser',UserUpdate)

router.delete('/deleteUser/:id',UserDelete)






module.exports=router
