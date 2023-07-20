const express = require('express');
const User = require('../models/User');
const {  protectUserRoutes, protectAdminRoutes } = require('../middleware/jwt');
const Controller = require('../controllers/controller');
const router = express.Router();

// Fetch all products and services information with their prices
/**
 * @description: This is the route for Fetching All items!.
 * @param: /api/items/
 * @access: protected(User)
 * 
 */
router.get('/', protectUserRoutes, Controller.getItems);
/**
 * @description: This is the route for Creating item!.
 * @param: /api/items/create
 * @access: protected(Admin)
 * 
 */
router.post('/create', protectAdminRoutes, Controller.createItems);


module.exports = router;