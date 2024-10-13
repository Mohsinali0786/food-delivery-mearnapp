const express =require('express')
const router = express.Router()
// const { body, validationResult } = require('express-validator');
const {Signup,UserLogin,getAllUser,UserUpdate, UserDelete} = require('..//controllers/authController')

router.post('/signUp', Signup)
router.post('/signIn', UserLogin)


// GET Routes
router.get('/getAllUsers', getAllUser)

router.post('/updateUser',UserUpdate)

router.delete('/deleteUser/:id',UserDelete)






module.exports=router
