const express = require('express');
const { protectUserRoutes, protectAdminRoutes } = require('../middleware/jwt');
const Controller = require('../controllers/controller');
const router = express.Router();
/**
 * @description: This is the user route for the API
 * @param: /api/user
 * @access: Public
 * 
 */
// Create an account
/**
 * @description: This is the account route for the API
 * @param: /api/user/account
 * @access: Public
 * 
 */
router.post('/account', Controller.createUser);
// get Account Details
/**
 * @description: This is the login route for the API
 * @param: /api/user/login
 * @access: Public
 * 
 */
router.post('/login', Controller.loginUser);
/**
 * @description: This is the route for placing order.
 * @param: /api/user/placeOrder
 * @access: protected(User)
 * 
 */
router.post("/placeOrder", protectUserRoutes, Controller.confirmOrder);
/**
 * @description: This is the route for Fetching All orders!.
 * @param: /api/user/allOrders
 * @access: protected(Admin)
 * 
 */

router.get("/allOrders", protectAdminRoutes, Controller.getAllOrders);

module.exports = router;