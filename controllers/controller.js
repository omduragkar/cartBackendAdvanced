const { createAccount, getUserDataController, loginController, confirmOrderController, getAllOrdersController } = require("./userController");
const { getItemsController, createItemsController } = require("./itemController");
const { createCartController, removeItemFromCartController, clearCartController, totalBillController } = require("./cartContoller");


/**
 * @description: This is the main controller for the API
 * 
 */

const Controller = {
    createUser:createAccount,
    loginUser:loginController,
    getUserData:getUserDataController,
    getItems:getItemsController,
    createItems:createItemsController,
    addToCart:createCartController,
    removeFromCart:removeItemFromCartController,
    clearCart:clearCartController,
    totalBill:totalBillController,
    confirmOrder:confirmOrderController,
    getAllOrders:getAllOrdersController
}

module.exports = Controller;



