const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({

    customer: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    resturant: {
        type: Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    totalAmount: {
        type: Number
    },

    orderStatus: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deliveryAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    items: {
        type: Schema.Types.ObjectId,
        ref: 'OrderItem'
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    },
    totalItem: {
        type: Number
    },
    totalPrice: {
        type: Number
    },

})
module.exports = mongoose.model('Order', orderSchema)

