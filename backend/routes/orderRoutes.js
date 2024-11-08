const express =require('express')
const router = express.Router()
const {placeOrder,getOrderItem, verifyOrder, userOrder ,listOrder, updateStatus} = require('..//controllers/orderController')
const {verifyToken} = require("../middleWare/verifyUser")
router.post('/placeOrder',verifyToken , placeOrder)
router.post('/verifyOrder', verifyOrder)
router.post('/userOrders', verifyToken , userOrder)
router.post('/updateStatus' , updateStatus)



// GET Routes
// router.post('/getAllOrderedItem', getOrderItem)
router.get('/listOrder' , listOrder)





module.exports=router
