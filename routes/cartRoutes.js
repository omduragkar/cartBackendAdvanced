const express = require('express');
const { protectUserRoutes } = require('../middleware/jwt');
const Controller = require('../controllers/controller');
const router = express.Router();

router.get('/details', protectUserRoutes , Controller.getUserData);


// Add a product or service to the cart
router.post('/add', protectUserRoutes, Controller.addToCart);

// Remove a product or service from the cart
router.post('/remove', protectUserRoutes, Controller.removeFromCart);

// // Clear the cart
router.post('/clear', protectUserRoutes, Controller.clearCart);

// // View total bill
router.get('/bill', protectUserRoutes, Controller.totalBill);

module.exports = router;
