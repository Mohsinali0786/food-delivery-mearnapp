const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({

    customer: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    items: {
        type: Schema.Types.ObjectId,
        ref: 'CartItem'
    },

    total: {
        type: Number,
    },

})
module.exports = mongoose.model('Cart', cartSchema)

