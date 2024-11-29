const Food = require('../models/foodModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const mongoose = require('mongoose')
const { createError } = require('../error')
const { generateToken, getUserIdFromToken } = require('../config/jwtToken')
const foodCategory = require('../models/foodCategoryModel')
const cloudinary = require("../service/cloudinaryUploader")
const addFoodByAdmin = async (req, res, next) => {
    // try {
    //     const { name, description, img, price, ingredients, category, userId } = req.body;

    //     const food = new Food({
    //         name,
    //         description,
    //         img,
    //         price,
    //         ingredients,
    //         category,
    //         user: userId
    //     });
    //     const createFood = await food.save();
    //     console.log('createFood', createFood)

    //     return res.status(201).json({ createFood });
    // } catch (err) {
    //     next(err);
    // }
}
const addFood = async (req, res, next) => {

    try {
        console.log(req.body)
        // const { name, description, price, category, userId } = req.body;
        const { description, productName, quantity, category, price } = req.body;
        const uploadRes = await cloudinary.uploader.upload(req.body.image, { upload_preset: "onlineShop" });
        if (uploadRes) {
            const product = new Food({
                description,
                image: uploadRes,
                name: productName,
                category,
                quantity,
                price: price,
                // user: userId
            });
            await product.save();
        }

        res.json({
            success: true,
            message: "Food Added successfully"
        })

    } catch (err) {
        console.log('Errrrr', err)
        res.json({
            success: false,
            message: "Error",
            error: err
        })
    }

}
const updateFoodQuantity = async (req, res, next) => {

    try {
        console.log(req.body)
        const { foodId, quantity, price } = req.body;
        await Food.findByIdAndUpdate(req.params.id, { quantity: quantity, price })
        res.json({
            success: true,
            message: `Update ${quantity ? 'Quantity' : 'Price'} successfully`
        })

    } catch (err) {
        console.log('Errrrr', err)
        res.json({
            success: false,
            message: "Error",
            error: err
        })
    }

}
const searchFood = async (req, res, next) => {

    try {
        console.log(req.body, 'SearchFood')
        const { name, value } = req.body;
        let result = await Food.find({
            [name]: { $regex: value.toLowerCase() }
        })
        console.log('res =====>', res)
        res.json({
            success: true,
            data: result
            // message: `Update ${quantity ? 'Quantity' : 'Price'} successfully`
        })

    } catch (err) {
        console.log('Errrrr', err)
        res.json({
            success: false,
            message: "Error",
            error: err
        })
    }

}

const addCategory = async (req, res, next) => {
    try {
        const categoryData = req.body;

        const { name } = categoryData;
        const category = new foodCategory({
            name,
        });
        await category.save();
        return res
            .status(201)
            .json({ success: true, message: "Products Category added successfully" });
    } catch (err) {
        next(err);
    }
}
const getCategory = async (req, res, next) => {
    try {
        let allCategories = await foodCategory.find();

        return res
            .status(201)
            .json({ message: "Products Category get successfully", allCategories });
    } catch (err) {
        next(err);
    }
}
const removeCategory = async (req, res, next) => {
    console.log(req.params.id)
    try {
        let result = await foodCategory.findByIdAndDelete(req.params.id);
        console.log(result, 'resssss')
        if (result) {
            return res
                .status(201)
                .json({ message: "Products Category removed successfully" });
        }
    } catch (err) {
        next(err);
    }
}
const getAllItems = async (req, res, next) => {
    try {
        let allItems = await Food.find().populate("user");


        console.log('allItems', allItems)
        return res.status(201).json({ success: true, allItems });
    } catch (err) {
        next(err);
    }
}

const removeItem = async (req, res, next) => {
    console.log(req.params, 'params')
    try {
        await Food.findByIdAndDelete(req.params.id)
        return res.status(201).json({ success: true, message: 'Food Removed' });
    } catch (err) {
        next(err);
    }
}
const getFoodById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return next(createError(400, "Invalid product ID"));
        }
        const food = await Food.findById(id).populate('user');
        if (!food) {
            return next(createError(404, "Food not found"));
        }
        return res.status(200).json(food);
    } catch (err) {
        next(err);
    }
}


const placeOrder = async (req, res, next) => {
    try {
        const { products, address, totalAmount } = req.body;
        const userJWTId = req.user;
        const user = await User.findById(userJWTId);

        const order = new Orders({
            products,
            user: user._id,
            total_amount: totalAmount,
            address,
        });

        await order.save();
        user.cart = [];
        await user.save();
        return res
            .status(200)
            .json({ message: "Order placed successfully", order });
    } catch (err) {
        next(err);
    }
};

const getAllOrders = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userJWTId = req.user;
        const user = await User.findById(userJWTId);
        if (!user.favourites.includes(productId)) {
            user.favourites.push(productId);
            await user.save();
        }
        return res
            .status(200)
            .json({ message: "Product added to favorites successfully", user });
    } catch (err) {
        next(err);
    }
};

// Favorites

const removeFromFavorites = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userJWT = req.user;
        const user = await User.findById(userJWT);
        console.log(user, 'user')
        const allUser = await User.find({}).populate('favourites');
        // let foodData = await Food.findByIdAndUpdate({ _id:productId},{ $inc: { likes:-1 }})
        let foodData = await Food.findById({ _id:productId})
        foodData.likes=foodData.likes-1
        await foodData.save()
        console.log('foodData',foodData)
        let ratting = (foodData.likes*100)/allUser.length
        await Food.findByIdAndUpdate({ _id:productId }, { rating: ratting  })
        user.favourites = user.favourites.filter((fav) => !fav.equals(productId));
        await user.save();

        return res
            .status(200)
            .json({ success: true, message: "Product removed from favorites successfully", user });
    } catch (err) {
        next(err);
    }
};

const addToFavorites = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userJWT = req.user;

        // calculate Rating
        
        const user = await User.findById(userJWT);
        // let count = 0
        // let foodData = await Food.findById({ _id:productId})
        let foodData = await Food.findByIdAndUpdate({ _id:productId},{ $inc: { likes: 1 } })
        if (!user.favourites.includes(productId)) {
            foodData.likes=foodData.likes+1
            user.favourites.push(productId);
            await user.save();
        }
        const allUser = await User.find({}).populate('favourites');
        // let allIds = []
        // for (let i = 1; i < allUser.length; i++) {

        //     console.log('allUser Name', (allUser.name))
        //     // console.log('allUser', allUser)
        //     // console.log('allUser', ((allUser[i])))
        //     for (let j = 1; j < allUser[i].favourites.length; j++) {
        //     // console.log('allUser', ((allUser[i].favourites[j]?._id)))
        //         allIds.push((allUser[i].favourites[j]?._id).valueOf())
        //     }
        //     console.log(allIds,'allIds')
        //     console.log(productId,'productId')

        //         if (allIds.includes(productId)) {
        //             count = count + 1
        //             console.log('count', count)
        //         }
                ratting = (foodData.likes *100) / allUser.length
                console.log('foodData.likes', foodData.likes)
                console.log('allUser.length', allUser.length)
                console.log('ratting', ratting)
            


        // }
            await Food.findByIdAndUpdate({ _id:productId }, { rating: ratting  })

        return res
            .status(200)
            .json({ success: true, message: "Product added to favorites successfully", user });
    } catch (err) {
        next(err);
    }
};

const getUserFavorites = async (req, res, next) => {
    try {
        const userId = req.user;
        console.log(req.user, 'req.user Get')
        const user = await User.findById(userId).populate("favourites").exec();
        if (!user) {
            return next(createError(404, "User not found"));
        }
        const favoriteProducts = user.favourites;
        return res.status(200).json(favoriteProducts);
    } catch (err) {
        next(err);
    }
};
module.exports = {
    addFood, addFoodByAdmin, getAllItems, getFoodById,
    searchFood,
    updateFoodQuantity,
    removeFromFavorites,
    addToFavorites,
    getUserFavorites,
    getAllOrders,
    placeOrder,
    addCategory,
    getCategory,
    removeCategory,
    removeItem,
}