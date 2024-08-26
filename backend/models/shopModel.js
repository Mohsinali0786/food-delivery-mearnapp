const mongoose = require('mongoose');
const shopSchema = new mongoose.Schema({

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
    products: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
})
module.exports = mongoose.model('Shop', shopSchema)

// For MM Garments