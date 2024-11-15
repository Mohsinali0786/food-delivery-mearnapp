const jwt = require('jsonwebtoken')
let SECRETE_KEY = process.env.JWT


const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRETE_KEY, { expiresIn: '1h' })
    // const emailToken = jsonwebtoken.sign({
    //     email: req.body.email
    // }, SECRETE_KEY, { expiresIn: '1h' });
}

const getUserIdFromToken = (token) => {
    let decodedToken = jwt.verify(token , SECRETE_KEY,)
    return decodedToken.userId

}

module.exports = {
    generateToken,
    getUserIdFromToken
}