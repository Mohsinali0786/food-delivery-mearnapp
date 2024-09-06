const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { createError } = require('../error')
const { generateToken, getUserIdFromToken } = require('../config/jwtToken')
const Signup = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use.", res));
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
    return res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
}

const UserLogin = async (req, res, next) => {
  try {
    const { email, password, token } = req.body;

    //Check for existing user
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return next(createError(409, "User not found.", res));
    }

    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password", res));
    }


    let loginTokenId = generateToken(user._id)
    // let userId = getUserIdFromToken(token)
    // console.log(userId)
    // if (userId = user._id) {
    //   return res.status(200).json({ user, user ,token:loginTokenId});
    // }
    return res.status(200).json({ user, user, token: loginTokenId });

  } catch (err) {
    next(err);
  }
};
const UserUpdate = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    //Check for existing user
    console.log(email, 'roleeeeeeee')
    const user = await User.findOneAndUpdate({ email: email }, { role: role }).exec();
    if (!user) {
      return next(createError(409, "User not found.", res));
    }

    return res.status(200).json({ success: true, message: 'Updated Successfully' });

  } catch (err) {
    next(err);
  }
};
const UserDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      
      console.log('iddd', id  , req.params)
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return next(createError(409, "User not found.", res));
      }

      return res.status(200).json({ success: true, message: 'Deleted  Successfully' });

    }
  }
  catch (err) {
    next(err);
  }
};
const getAllUser = async (req, res, next) => {
  try {

    const user = await User.find().exec();
    if (!user) {
      return next(createError(409, "User not found.", res));
    }
    res.status(200).json({ user, user });
  } catch (err) {
    next(err);
  }
};





//Cart

module.exports = { Signup, UserLogin, getAllUser, UserUpdate, UserDelete }