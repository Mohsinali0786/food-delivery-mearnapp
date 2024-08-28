const Food = require('../models/foodModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { createError } = require('../error')
const { generateToken, getUserIdFromToken } = require('../config/jwtToken')


const addFoodByAdmin = async (req, res, next) => {
    try {
        const { name, description, img, price, ingredients, category, userId } = req.body;

        const food = new Food({
            name,
            description,
            img,
            price,
            ingredients,
            category,
            user: userId
        });
        const createFood = await food.save();
        console.log('createFood', createFood)

        return res.status(201).json({ createFood });
    } catch (err) {
        next(err);
    }
}
const addFood = async (req, res, next) => {

    try {
        const foodData = req.body;
        if (!Array.isArray(foodData)) {
            return next(
                createError(400, "Invalid request. Expected an array of foods.")
            );
        }
        let createdfoods = [];
        for (const foodInfo of foodData) {
            const { name, desc, img, price, ingredients, category } = foodInfo;
            const product = new Food({
                name,
                desc,
                img,
                price,
                ingredients,
                category,
            });
            const createdFoods = await product.save();
            createdfoods.push(createdFoods);
        }
        return res
            .status(201)
            .json({ message: "Products added successfully", createdfoods });
    } catch (err) {
        next(err);
    }

}
const getAllItems = async (req, res, next) => {
    try {
        // let allItems = await Food.find().populate("user", { '_id': '66cc7bb5aa6dcf5746e09c0b' });
        let allItems = await Food.find().populate("user");

        // ingredients = ingredients?.split(",");
        // categories = categories?.split(",");

        // const filter = {};
        // if (categories && Array.isArray(categories)) {
        //   filter.category = { $in: categories }; // Match products in any of the specified categories
        // }
        // if (ingredients && Array.isArray(ingredients)) {
        //   filter.ingredients = { $in: ingredients }; // Match products in any of the specified ingredients
        // }
        // if (maxPrice || minPrice) {
        //   filter["price.org"] = {};
        //   if (minPrice) {
        //     filter["price.org"]["$gte"] = parseFloat(minPrice);
        //   }
        //   if (maxPrice) {
        //     filter["price.org"]["$lte"] = parseFloat(maxPrice);
        //   }
        // }
        // if (search) {
        //   filter.$or = [
        //     { title: { $regex: new RegExp(search, "i") } }, // Case-insensitive title search
        //     { desc: { $regex: new RegExp(search, "i") } }, // Case-insensitive description search
        //   ];
        // }
        // const foodList = await Food.find(filter);
        return res.status(201).json({ allItems });
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

const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userJWT = req.user;
        //   console.log('userJWT',userJWT)
        const user = await User.findById(userJWT);
        //   console.log('userJWT',user)

        const existingCartItemIndex = user.cart.findIndex((item) =>
            item.product.equals(productId)
        );
        console.log('existingCartItemIndex', existingCartItemIndex)

        if (existingCartItemIndex !== -1) {
            // Product is already in the cart, update the quantity
            user.cart[existingCartItemIndex].quantity += quantity ? quantity : 1;
        } else {
            // Product is not in the cart, add it
            user.cart.push({ product: productId, quantity });
        }
        await user.save();
        return res
            .status(200)
            .json({ message: "Product added to cart successfully", user });
    } catch (err) {
        next(err);
    }
};

const removeFromCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        console.log('Remoie')
        const userJWTId = req.user;
        const user = await User.findById(userJWTId);
        if (!user) {
            return next(createError(404, "User not found", res));
        }
        console.log('user.cart', user.cart)
        const productIndex = user.cart.findIndex((item) =>
            item.product.equals(productId)
        );
        console.log('productIndex', productIndex)

        if (productIndex !== -1) {
            if (quantity && quantity > 0) {
                user.cart[productIndex].quantity -= quantity;
                if (user.cart[productIndex].quantity <= 0) {
                    user.cart.splice(productIndex, 1); // Remove the product from the cart
                }
            } else {
                user.cart.splice(productIndex, 1);
            }

            await user.save();

            return res
                .status(200)
                .json({ message: "Product quantity updated in cart", user });
        } else {
            return next(createError(404, "Product not found in the user's cart", res));
        }
    } catch (err) {
        next(err);
    }
};
const getAllCartItems = async (req, res, next) => {
    try {
        const userJWTId = req.user;
        const user = await User.findById(userJWTId).populate({
            path: "cart.product",
            model: "Food",
        });
        const cartItems = user.cart;
        return res.status(200).json(cartItems);
    } catch (err) {
        next(err);
    }
};
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
module.exports = { addFood, addFoodByAdmin, getAllItems, getFoodById, addToCart, removeFromCart, getAllCartItems,
    removeFromFavorites,
    addToFavorites,
    getUserFavorites,
    getAllOrders,
    placeOrder

 }