const {addToCart , removeFromCart ,getAllCartItems} = require("../controllers/cartController")
const express =require('express')
const router = express.Router()
const {verifyToken} = require('../middleWare/verifyUser')

router.post('/cart',verifyToken , addToCart)
router.patch("/cart", verifyToken, removeFromCart);
router.get("/cart", verifyToken, getAllCartItems);

module.exports=router
