const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
  fullName: {
    type: String
},
streetAddress: {
  type: String
},
city: {
  type: String
},
state: {
  type: String
},
postalCode: {
  type: String
},

country: {
    type: Number,
},

  })
  module.exports=mongoose.model('Address',addressSchema)

  