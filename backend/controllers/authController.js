const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const { createError } = require('../error')
const { generateToken, getUserIdFromToken } = require('../config/jwtToken')
const Signup = async (req, res, next) => {
  console.log('req.body',req.body)
  try {
    const { email, password, name, img } = req.body;
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      // return next(createError(409, "Email is already in use.", res));
      return res.json({success:false ,message:"Email is already in use"})
    }
    if(!validator.isEmail(email)){
      return res.json({success:false , message:"Please enter a valid email"})
    }
    if(password.length < 8 ){
      return res.json({success:false , message:"Please enter a Strong Password Must be 8 character long"})
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save();
    console.log('createdUser', createdUser)
    let token = generateToken(user._id)
    return res.status(201).json({success:true , token, user });
  } catch (err) {
    res.json({success:false ,message:"Error"})
    next(err);
  }
}

const UserLogin = async (req, res, next) => {
  try {
    const { email, password, token } = req.body;

    //Check for existing user
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      // return next(createError(409, "User not found.", res));
      return res.json({success:false , message:"User not found."});
    }

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      // return next(createError(403, "Incorrect password", res));
      return res.json({success:false , message:"Incorrect password"});

    }


    let loginTokenId = generateToken(user._id)
    // let userId = getUserIdFromToken(token)
    // console.log(userId)
    // if (userId = user._id) {
    //   return res.status(200).json({ user, user ,token:loginTokenId});
    // }
    return res.status(200).json({success:true, user,  token: loginTokenId ,message:'Login In Successfully'});

  } catch (err) {
    next(err);
  }
};
const UserUpdate = async (req, res, next) => {
  // try {
  //   const { email, password, role , userId } = req.body;

  //   //Check for existing user
  //   console.log(userId, 'roleeeeeeee')
  //   const user = await User.findByIdAndUpdate({_id:userId }, { role: role }).exec();
  //   if (!user) {
  //     return next(createError(409, "User not found.", res));
  //   }

  //   return res.status(200).json({ success: true, message: 'Role Updated Successfully' });

  // } catch (err) {
  //   next(err);
  // }
};
const UserDelete = async (req, res, next) => {
  // try {
  //   const { id } = req.params;
  //   if (id) {
      
  //     console.log('iddd', id  , req.params)
  //     const user = await User.findByIdAndDelete(id);
  //     if (!user) {
  //       return next(createError(409, "User not found.", res));
  //     }

  //     return res.status(200).json({ success: true, message: 'Deleted  Successfully' });

  //   }
  // }
  // catch (err) {
  //   next(err);
  // }
};
const getAllUser = async (req, res, next) => {
  // try {

  //   const user = await User.find().exec();
  //   if (!user) {
  //     return next(createError(409, "User not found.", res));
  //   }
  //   res.status(200).json({ user, user });
  // } catch (err) {
  //   next(err);
  // }
};





//Cart

module.exports = { Signup, UserLogin, getAllUser, UserUpdate, UserDelete }