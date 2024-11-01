
const mongoose = require('mongoose');
// const foodSchema = new mongoose.Schema({
//     name: {
//         type: String,
//     },
//     description: {
//         type: String,
//     },
//     price: {
//         type: Number,
//     },
//     foodCategory: {
//         type: Schema.Types.ObjectId,
//         ref: 'Category'
//     },
//     image: {
//         type: String,
//     },
//     available: {
//         type: Boolean,
//     },
//     resturant: {
//         type: Schema.Types.ObjectId,
//         ref: 'Resturant'
//     },
//     isVegeterian: {
//         type: Boolean,
//     },
//     isSeasonal: {
//         type: Boolean,
//     },
//     creationDate: {
//         type: Date,
//         default: Date.now
//     },
//     ingredients: {
//         type: [String],
//     },

//     totalPrice: {
//         type: Number,
//     },

// })
const FoodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: Object,
            default: null,
        },
        price: {
            type: {
                org: { type: Number, default: 0.0 },
                mrp: { type: Number, default: 0.0 },
                off: { type: Number, default: 0 },
            },
            default: { org: 0.0, mrp: 0.0, off: 0 },
        },
        // price: {
        //     type: Number
        // },
        quantity:{
            type: Number,
            default: 0,
        },
        category: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model('Food', FoodSchema)



// For foodDeliveryApp