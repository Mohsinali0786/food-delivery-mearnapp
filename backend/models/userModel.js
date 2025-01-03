const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    //   required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        enum:['ADMIN_ROLE','USER_ROLE','SUPERADMIN_ROLE'],
        default:'USER_ROLE'
      },
    img: {
      type: String,
      default: null,
    },
    favourites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Food",
      default: [],
    },
    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Orders",
      default: [],
    },
    cart: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
          quantity: { type: Number, default: 1 },
        },
      ],

      default: [],
    },
    isVerified:{
      type:Boolean,
      default:false
  },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', UserSchema)
