const express =require('express')
const router = express.Router()
const {addFoodByAdmin ,addFood,getAllItems ,getFoodById, addToCart,removeFromCart,getAllCartItems,addToFavorites,getUserFavorites,removeFromFavorites,getAllOrders,placeOrder, addCategory, getCategory} = require('..//controllers/foodController')
const {verifyToken} = require('../middleWare/verifyUser')
router.post('/addFood', addFood)
router.post('/addFoodByAdmin', addFoodByAdmin)
router.get('/getAllItems', getAllItems)
router.get('/getFoodById/:id', getFoodById)


router.post('/cart',verifyToken , addToCart)
router.patch("/cart", verifyToken, removeFromCart);
router.get("/cart", verifyToken, getAllCartItems);


router.post("/favorite", verifyToken, addToFavorites);
router.get("/favorite", verifyToken, getUserFavorites);
router.patch("/favorite", verifyToken, removeFromFavorites);

router.post("/order", verifyToken, placeOrder);
router.get("/order", verifyToken, getAllOrders);

router.post("/add-category", addCategory);
router.get("/get-category", getCategory);











module.exports=router
