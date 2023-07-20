const express = require('express');
const { protectUserRoutes, protectAdminRoutes } = require('../middleware/jwt');
const Controller = require('../controllers/controller');
const router = express.Router();

// Create an account
router.post('/account', Controller.createUser);
// get Account Details
router.post('/login', Controller.loginUser);

router.post("/placeOrder", protectUserRoutes, Controller.confirmOrder);

router.get("/allOrders", protectAdminRoutes, Controller.getAllOrders);

module.exports = router;