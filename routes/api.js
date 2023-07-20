const express = require('express');

const router = express.Router();

router.use("/user", require("./userRoutes") );
router.use("/items", require("./itemRoutes") );
router.use("/cart", require("./cartRoutes") );




// Confirm the order (not implemented in this example)

module.exports = router;