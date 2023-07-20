const { response } = require("../helper/response");
const { createJWT } = require("../middleware/jwt");
const Order = require("../models/Order");
const User = require("../models/User");

module.exports.createAccount = async (req, res) => {
    const { email, role = "USER" } = req.body;
    try {
        // Create a new user's account
        const newUser = await User.create({ email, cart: [], role });
        if (!newUser) {
            response(res, 404, 'Account creation issue!', null, true);

        } else {
            const jwtToken = await createJWT(newUser._id);
            response(res, 200, 'Account created successfully!', { userToken: jwtToken }, false);

        }
    } catch (err) {
        console.log(err)
        response(res, 500, 'Could not create an account!', err, true);
    }
}
module.exports.getUserDataController = async (req, res) => {
    try {
        const { email, cart, cartBillAmount, cartTax, cartTotalAmount } = req.user;
        console.log(req.user)
        response(res, 200, 'Account Details!', { email, cart, cartBillAmount, cartTax, cartTotalAmount}, false);


    } catch (err) {
        console.log(err)
        response(res, 500, 'Could not retreive account!', err, true);
    }
}

module.exports.loginController = async (req, res) => {
    const { email } = req.body;
    try {
        // Create a new user's account
        const user = await User.findOne({ email });
        if (!user) {
            response(res, 404, 'Account does not exist!', null, true);

        } else {
            const jwtToken = await createJWT(user._id);
            response(res, 200, 'Account Login successful!', { userToken: jwtToken }, false);

        }
    } catch (err) {
        console.log(err)
        response(res, 500, 'Could not Fetch an account!', err, true);
    }
}


module.exports.confirmOrderController = async (req, res) => {
    const {cart} = req.user;
    try {
        let createOrder = await Order.create({
            cart: cart,
            userId: req.user._id,
            billAmount: req.user.cartBillAmount,
            taxAmount: req.user.cartTax,
            totalAmount: req.user.cartTotalAmount
        });
        if(!createOrder)
        {
            response(res, 400, "Could not create order.", null, true);
        }else{
            let  placedOrder = await User.findByIdAndUpdate(req.user._id, {
                $push: { orders: createOrder._id },
                $set: { cart: [],  cartBillAmount:0, cartTax:0, cartTotalAmount:0}
            }, { new: true });
            if(!placedOrder)
            {
                response(res, 400, "Could not place order.", null, true);
            }else{
                response(res, 200, "Order placed successfully.", {createOrder, placedOrder}, false);
            }

        }
    }catch(err){
        console.log(err)
        response(res, 500, 'Could not confirm order!', err, true);
    }
}


module.exports.getAllOrdersController = async (req, res) => {
    try {
        let orders = await Order.find().populate([{
            path: 'cart',
            populate: {
                path: 'item',
                model: 'Item'
            }, 

        },{
            path:"userId",
        }]);
        if(!orders)
        {
            response(res, 400, "Could not fetch orders.", null, true);
        }else{
            response(res, 200, "Orders fetched successfully.", orders, false);
        }
    }catch(err){
        console.log(err)
        response(res, 500, 'Could not fetch orders!', err, true);
    }
}