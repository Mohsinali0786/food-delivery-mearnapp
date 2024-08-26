const mongoose = require('mongoose');
const ingredientsItemsSchema = new mongoose.Schema({

    name: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'IngredientCategory'
    },
    resturant: {
        type: Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    inStock: {
        type: Boolean,
        default:false
    },

})
module.exports = mongoose.model('IngredientItem', ingredientsItemsSchema)

