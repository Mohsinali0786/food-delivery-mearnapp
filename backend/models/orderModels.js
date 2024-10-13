const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: {
        // type: mongoose.Types.ObjectId,
        type:String,
        // ref: "User",
        required: true,
    },
    items:{type:Array,required:true},
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: "Food Processing",
    },
    date:{type:Date,default:Date.now()}, 
    payment:{type:Boolean,default:false}
    // products: {
    //     type: [
    //         {
    //             product: {
    //                 type: mongoose.Schema.Types.ObjectId,
    //                 ref: "Food",
    //                 required: true,
    //             },
    //             quantity: { type: Number, default: 1 },
    //         },
    //     ],
    //     required: true,
    // },
},
    // { timestamps: true }
);
// resturant: {
//     type: Schema.Types.ObjectId,
//     ref: 'Resturant'
// },
// items: {
//     type: Schema.Types.ObjectId,
//     ref: 'OrderItem'
// },
// payment: {
//     type: Schema.Types.ObjectId,
//     ref: 'Payment'
// },

module.exports = mongoose.model('Order', orderSchema)

