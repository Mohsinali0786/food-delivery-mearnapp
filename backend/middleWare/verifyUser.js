const {createError} = require('../error.js');
const { getUserIdFromToken } = require('../config/jwtToken.js');
const jsonwebtoken = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  try {
    const {Authorization} =req.headers
    console.log('req.headers.authorization',req.headers)
    // console.log('splittttttttttt',req.headers.authorization.split(" "))
    
    // if (!req.headers.authorization) {
    //     return next(createError(401, "You are not authenticated!",res));
    // }
    // const token = req.headers.authorization.split(" ")[1];
    // console.log('tokennnnnnnn',token)
    
    if (!token) return next(createError(401, "You are not authenticated!",res));
    // console.log('process.env.JWT',process.env.JWT)
    // const decode =  jsonwebtoken.verify(token, process.env.JWT);
    const decode =  getUserIdFromToken(token)

    // console.log('decode',decode)

    req.user = decode;
    return next();
  } catch (err) {
    next(err);
  }
};
module.exports={verifyToken}