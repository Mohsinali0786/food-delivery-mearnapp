const express =require('express')
const router = express.Router()
const {orderItem,getOrderItem} = require('..//controllers/orderController')

router.post('/orderItem', orderItem)
// GET Routes
router.post('/getAllOrderedItem', getOrderItem)





module.exports=router
