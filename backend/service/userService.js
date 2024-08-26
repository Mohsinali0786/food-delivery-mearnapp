const {User} =require('../models/userSchema')
const {getUserIdFromToken} = require('../config/jwtToken')
const findUserById = async (userId)=>{
    try {
        const User = await User.findById(userId).populate("addresses")
        if(!User) {throw new Error ('User not found with - ',userId)}
        return User
    }
    catch (error){
        throw new Error (error.message)
    }
}

const findUserByJWT = async (jwt)=>{
    try {
        const userId = getUserIdFromToken(jwt)
        const User = await User.findById(userId)
        if(!User) {throw new Error ('User not found')}
        return User
    }
    catch (error){
        throw new Error (error.message)
    }
}
const findAllUser = async (jwt)=>{
    try {
        const User = await User.find()
        return User
    }
    catch (error){
        throw new Error (error.message)
    }
}
module.exports = {
    findUserById,
    findUserByJWT,
    findAllUser
}