const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { response } = require('../helper/response');
const { ADMIN } = require('../constants/type');

const createJWT = (user) => {
    return jwt.sign({ userId:user}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

const protectUserRoutes = async (req, res, next) => {
    // console.log("getUserData", req.headers.authorization)
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).populate('cart');
            next();
        } catch (error) {
            console.log(error);
            response(res, 401, "Not Authorized, Token Failed!", error, true);
        }
    }
    if(!token)
    {
        response(res, 401, "Not Authorized, Not Token!", null, true);
    }
}

const protectAdminRoutes = async (req, res, next) => {
    // console.log("getUserData", req.headers.authorization)
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded)
            const userData = await User.findById(decoded.userId);
            if(userData.role === ADMIN){
                next();
            }else{
                response(res, 401, "Not Authorized, No Admin Access!", null, true);
            }
        } catch (error) {
            console.log(error);
            response(res, 401, "Not Authorized, Token Failed!", error, true);
        }
    }
    if(!token)
    {
        response(res, 401, "Not Authorized, Not Token!", null, true);
    }
}


module.exports ={
    protectUserRoutes,
    createJWT,
    protectAdminRoutes
}