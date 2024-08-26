
const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    foodCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    image: {
        type: String,
    },
    available: {
        type: Boolean,
    },
    resturant: {
        type: Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    isVegeterian: {
        type: Boolean,
    },
    isSeasonal: {
        type: Boolean,
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    ingredients: {
        type: [String],
    },

    totalPrice: {
        type: Number,
    },

})
module.exports = mongoose.model('Food', foodSchema)



// For foodDeliveryApp