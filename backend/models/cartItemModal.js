const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({

    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    food: {
        type: Schema.Types.ObjectId,
        ref: 'Food'
    },
    quantity: {
        type: Number,
    },
    ingredients: {
        type: [String],
    },

    totalPrice: {
        type: Number,
    },

})
module.exports = mongoose.model('CartItem', cartItemSchema)

