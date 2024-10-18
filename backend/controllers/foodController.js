const Food = require('../models/foodModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const mongoose = require('mongoose')
const { createError } = require('../error')
const { generateToken, getUserIdFromToken } = require('../config/jwtToken')
const foodCategory = require('../models/foodCategoryModel')


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
        const foodData = req.body;
        const file_name = req.file.filename

        const { name, description, price, category, userId } = foodData;
        console.log('price', JSON.parse(req.body.price))

        const product = new Food({
            name,
            description,
            image: file_name,
            price:JSON.parse(req.body.price),
            category,
            user: userId
        });
        await product.save();
        res.json({
            success: true,
            message: "Food Added successfully"
        })

    } catch (err) {
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
            .json({ message: "Products Category added successfully" });
    } catch (err) {
        next(err);
    }
}
const getCategory = async (req, res, next) => {
    try {
        let allCategories = await foodCategory.find();

        return res
            .status(201)
            .json({ message: "Products Category added successfully", allCategories });
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
    try {
        let item = await Food.findById(req.body.id);
        console.log(item, 'item ===>')
        await Food.findByIdAndDelete(req.body.id)
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

//Favorites

const removeFromFavorites = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userJWT = req.user;
        const user = await User.findById(userJWT.id);
        user.favourites = user.favourites.filter((fav) => !fav.equals(productId));
        await user.save();

        return res
            .status(200)
            .json({ message: "Product removed from favorites successfully", user });
    } catch (err) {
        next(err);
    }
};

const addToFavorites = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userJWT = req.user;
        const user = await User.findById(userJWT.id);

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

const getUserFavorites = async (req, res, next) => {
    try {
        const userId = req.user.id;
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
    removeFromFavorites,
    addToFavorites,
    getUserFavorites,
    getAllOrders,
    placeOrder,
    addCategory,
    getCategory,
    removeItem

}