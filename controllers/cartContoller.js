const {calculateItemValue, calculateCartValue} = require("../helper/billCalculator");
const { findItemHelper } = require("../helper/findHelper");
const { response } = require("../helper/response");
const CARTITEM = require("../models/CartItem");
const User = require("../models/User");

module.exports.createCartController = async (req, res) => {
    try {
        const { itemId, quantity = 1 } = req.body;
        let { cartBillAmount, cartTax, cartTotalAmount, cart } = req.user;
        
        let findItem  = await findItemHelper({ _id: itemId });
        let itemAlreadyExists = await CARTITEM.findOne({ item: itemId, userId: req.user._id });
        if (itemAlreadyExists) {
            if (quantity == itemAlreadyExists.quantity) {
                response(res, 400, "Item already exists in cart.", null, true);
            } else {
                let totalBill = await calculateItemValue(findItem,quantity);
                console.log({totalBill});
                let updateItemForCart = await CARTITEM.findOneAndUpdate({ item: itemId,
                    userId: req.user._id, 
                }, {
                    quantity: quantity,
                    billAmount: totalBill.billAmount,
                    taxAmount: totalBill.taxAmount,
                    totalAmount: totalBill.totalAmount
                }, { new: true }).populate('item');
                if (!updateItemForCart) {
                    response(res, 400, "Could not update cart item.", null, true);
                } else {

                    let updateCart = await User.findById(req.user._id).populate('cart');
                    let cartValue = await calculateCartValue(updateCart.cart);
                    // console.log({cartValue});
                    let finalUpdate = await User.findByIdAndUpdate(req.user._id,{
                        cartBillAmount : cartValue.cartBillAmount,
                        cartTax : cartValue.cartTax,
                        cartTotalAmount : cartValue.cartTotalAmount,

                    }).populate('cart');
                    response(res, 200, "Cart item updated successfully.", finalUpdate, false);
                }
            }
        }
        else {
            
            let totalBill = await calculateItemValue(findItem, quantity);
            console.log({totalBill});

            let createItemForCart = await CARTITEM.create({
                item: itemId,
                quantity: quantity,
                userId: req.user._id,
                billAmount: totalBill.billAmount,
                taxAmount: totalBill.taxAmount,
                totalAmount: totalBill.totalAmount
                
            });

            if (!createItemForCart) {
                response(res, 400, "Could not create cart item.", null, true);
            } else {
                let updateCart = await User.findByIdAndUpdate(req.user._id, {
                    $push: { cart: createItemForCart._id }
                }, { new: true }).populate('cart');
                if (!updateCart) {
                    response(res, 400, "Could not add Item to cart.", null, true);
                } else {
                    let cartValue = await calculateCartValue(updateCart.cart);
                    // console.log({cartValue});
                    let finalUpdate = await User.findByIdAndUpdate(req.user._id,{
                        cartBillAmount : cartValue.cartBillAmount,
                        cartTax : cartValue.cartTax,
                        cartTotalAmount : cartValue.cartTotalAmount,

                    },{
                        new: true
                    }).populate('cart');
                    response(res, 200, "item added successfully to Cart.", finalUpdate, false);
                }
            }
        }
    } catch (err) {
        console.log(err)
        response(res, 500, "Could not create cart.", err, true);
    }
};

module.exports.removeItemFromCartController = async (req, res) => {
    try {
        const { itemId } = req.body;

        const cart = await CARTITEM.findOneAndDelete({ item: itemId, userId: req.user._id })

        if (!cart) {
            response(res, 404, 'Cart Item not found.', null, true);
        } else {
            response(res, 200, 'Cart Item cleared successfully!', cart, false);
        }
    } catch (err) {
        response(res, 500, 'Could not clear the cart.', err, true);
    }
};

module.exports.clearCartController = async (req, res) => {
    try {
        const deleteCartItems = await CARTITEM.deleteMany({ userId: req.user._id });

        if (!deleteCartItems) {
            response(res, 404, 'Cart seems Already Cleared!.', null, true);
        }else{
            let userUpdate = await User.findByIdAndUpdate(req.user._id, {
                $set: { cart: [] },
            }, { new: true }).populate('cart');
            if(!userUpdate){
                response(res, 404, 'Cart not found.', null, true);
            }else{
                response(res, 200, 'Cart cleared successfully!', userUpdate, false);
            }
        }
    } catch (err) {
        console.log(err);
        response(res, 500, 'Could not clear the cart.', err, true);
    }
}


module.exports.totalBillController =  async (req, res) => {
    try {
        const completeDetails = await User.findById(req.user._id).populate({
            path: 'cart',
            populate: {
                path: 'item',
            }
        }).select("_id cart cartBillAmount cartTax cartTotalAmount");
       response(res, 200, 'Total Bill!', completeDetails, false)
    } catch (err) {
        console.log(err);
        response(res, 500, 'Could not retreive account!', err, true);
    }
}