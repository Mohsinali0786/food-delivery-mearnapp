const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({

    food: {
        type: Schema.Types.ObjectId,
        ref: 'Food'
    },
    quantity: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    ingredients: {
        type: [String]
    },

})
module.exports = mongoose.model('OrderItem', orderItemSchema)

