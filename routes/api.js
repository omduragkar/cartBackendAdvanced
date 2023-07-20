/**
 * 
 * @description: This is the main route for the API
 * @param: /api
 * @access: Public
 * 
 */
const express = require('express');

const router = express.Router();


/**
 * @description: This is the user route for the API
 * @param: /api/user
 */
router.use("/user", require("./userRoutes") );


/**
 * @description: This is the items route for the API
 * @param: /api/items
 */
router.use("/items", require("./itemRoutes") );


/**
 * @description: This is the cart route for the API
 * @param: /api/cart
 */
router.use("/cart", require("./cartRoutes") );





module.exports = router;