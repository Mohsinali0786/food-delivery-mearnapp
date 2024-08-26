const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({

    name: {
        type: String
    },
    resturant: {
        type: Schema.Types.ObjectId,
        ref: 'Resturant'
    },

})
module.exports = mongoose.model('Category', categorySchema)

