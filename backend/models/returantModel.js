const mongoose = require('mongoose');
const returantSchema = new mongoose.Schema({

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    contactInformation: {
        type: String,
    },
    openingHours: {
        type: String,
    },
    Order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    numRating: {
        type: Number,
    },
    images: {
        type: String,
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    open: {
        type: Boolean,
    },
    food: {
        type: Schema.Types.ObjectId,
        ref: 'Food'
    },
})
module.exports = mongoose.model('Resturant', returantSchema)

// For Food DeliveryApp