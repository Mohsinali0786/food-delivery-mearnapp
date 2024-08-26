const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    image: {
        type: String
    },
    startedAt: {
        type: String
    },
    endAt: {
        type: String
    },
    name: {
        type: String
    },
    resturant: {
        type: Schema.Types.ObjectId,
        ref: 'Resturant'
    },
    location:{
        type:String
    }

})
module.exports = mongoose.model('Event', eventSchema)

