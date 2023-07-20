const express = require('express');
const User = require('../models/User');
const {  protectUserRoutes, protectAdminRoutes } = require('../middleware/jwt');
const Controller = require('../controllers/controller');
const router = express.Router();

// Fetch all products and services information with their prices
router.get('/', protectUserRoutes, Controller.getItems);

router.post('/create', protectAdminRoutes, Controller.createItems);


module.exports = router;