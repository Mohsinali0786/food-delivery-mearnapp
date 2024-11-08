const express =require('express')
const multer  = require('multer')
const router = express.Router()
const {addFoodByAdmin ,addFood,getAllItems ,getFoodById,addToFavorites,getUserFavorites,removeFromFavorites,getAllOrders,placeOrder, addCategory, getCategory, removeItem, removeCategory, updateFoodQuantity} = require('..//controllers/foodController')
const {verifyToken} = require('../middleWare/verifyUser')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//     destination:'uploads',
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}${file.originalname}`);
//     },
//   });
//   const upload = multer({ storage: storage });

// router.post('/addFood' , upload.single('image'), addFood)
router.post('/addFood' , addFood)


router.post('/addFoodByAdmin', addFoodByAdmin)
router.get('/getAllItems', getAllItems)
router.get('/getFoodById/:id', getFoodById)
router.post('/updateQuantity/:id', updateFoodQuantity)
router.delete('/deleteFoodById/:id', removeItem)



router.post("/favorite", verifyToken, addToFavorites);
router.get("/favorite", verifyToken, getUserFavorites);
router.patch("/favorite", verifyToken, removeFromFavorites);

router.post("/order", verifyToken, placeOrder);
router.get("/order", verifyToken, getAllOrders);

router.post("/add-category", addCategory);
router.get("/get-category", getCategory);
router.delete("/remove-category/:id", removeCategory);












module.exports=router
