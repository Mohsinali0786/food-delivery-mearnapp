const mongoose = require('mongoose');
const ingredientsCategorySchema = new mongoose.Schema({

    name: {
        type: String
    },
    resturant: {
        type: Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    inGredientsItems: {
        type: Schema.Types.ObjectId,
        ref: 'InGredientsItems'
    },

})
module.exports = mongoose.model('IngredientCategory', ingredientsCategorySchema)

