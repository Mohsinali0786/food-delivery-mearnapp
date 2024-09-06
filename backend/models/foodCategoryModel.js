
const mongoose = require('mongoose');
const FoodCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model('FoodCategory', FoodCategorySchema)



// For foodDeliveryApp