const express = require('express');
const { protectUserRoutes } = require('../middleware/jwt');
const Controller = require('../controllers/controller');
const router = express.Router();

/**
 * @description: This is the cart route for the API
 * @param: /api/cart/details
 * @access: protected(User)
 * 
 */
router.get('/details', protectUserRoutes , Controller.getUserData);

// Add a product or service to the cart
/**
 * @description: This is the cart route for the API
 * @param: /api/cart/add
 * @access: protected(User)
 * 
 */
router.post('/add', protectUserRoutes, Controller.addToCart);

// Remove a product or service from the cart
/**
 * @description: This is the cart route for the API
 * @param: /api/cart/remove
 * @access: protected(User)
 * 
 */
router.post('/remove', protectUserRoutes, Controller.removeFromCart);

// // Clear the cart
/**
 * @description: This is the cart route for the API
 * @param: /api/cart/clear
 * @access: protected(User)
 * 
 */
router.post('/clear', protectUserRoutes, Controller.clearCart);

// // View total bill
/**
 * @description: This is the cart route for the API
 * @param: /api/cart/bill
 * @access: protected(User)
 * 
 */
router.get('/bill', protectUserRoutes, Controller.totalBill);

module.exports = router;
