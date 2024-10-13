const Food = require('../models/foodModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const mongoose = require('mongoose')
const { createError } = require('../error')
const { generateToken, getUserIdFromToken } = require('../config/jwtToken')
const foodCategory = require('../models/foodCategoryModel')


const addToCart = async (req, res, next) => {
    // try {
    //     const { productId, quantity } = req.body;
    //     console.log('req.body',req.body)
    //     const userJWT = req.user;
    //       console.log('userJWT',userJWT)
    //     const user = await User.findById(userJWT);
    //       console.log('userJWT',user)

    //     const existingCartItemIndex = user.cart.findIndex((item) =>
    //         item?.product?.equals(productId)
    //     );
    //     console.log('existingCartItemIndex', existingCartItemIndex)

    //     if (existingCartItemIndex !== -1) {
    //         // Product is already in the cart, update the quantity
    //         user.cart[existingCartItemIndex].quantity += quantity ? quantity : 1;
    //     } else {
    //         // Product is not in the cart, add it
    //         user.cart.push({ product: productId, quantity });
    //     }
    //     await user.save();
    //     return res
    //         .status(200)
    //         .json({ message: "Product added to cart successfully", user });
    // } catch (err) {
    //     next(err);
    // }
};

const removeFromCart = async (req, res, next) => {
    // try {
    //     const { productId, quantity } = req.body;
    //     console.log('Remoie')
    //     const userJWTId = req.user;
    //     const user = await User.findById(userJWTId);
    //     if (!user) {
    //         return next(createError(404, "User not found", res));
    //     }
    //     console.log('user.cart', user.cart)
    //     const productIndex = user.cart.findIndex((item) =>
    //         item.product.equals(productId)
    //     );
    //     console.log('productIndex', productIndex)

    //     if (productIndex !== -1) {
    //         if (quantity && quantity > 0) {
    //             user.cart[productIndex].quantity -= quantity;
    //             if (user.cart[productIndex].quantity <= 0) {
    //                 user.cart.splice(productIndex, 1); // Remove the product from the cart
    //             }
    //         } else {
    //             user.cart.splice(productIndex, 1);
    //         }

    //         await user.save();

    //         return res
    //             .status(200)
    //             .json({ message: "Product quantity updated in cart", user });
    //     } else {
    //         return next(createError(404, "Product not found in the user's cart", res));
    //     }
    // } catch (err) {
    //     next(err);
    // }
};
const getAllCartItems = async (req, res, next) => {
    // try {
    //     const userJWTId = req.user;
    //     const user = await User.findById(userJWTId).populate({
    //         path: "cart.product",
    //         model: "Food",
    //     });
    //     const cartItems = user.cart;
    //     return res.status(200).json(cartItems);
    // } catch (err) {
    //     next(err);
    // }
};

module.exports = {
    addToCart, removeFromCart, getAllCartItems,
}