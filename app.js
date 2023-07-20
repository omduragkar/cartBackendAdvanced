const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require('./helper/connectDB');

const app = express();
app.use(express.json());
app.use(cors());

// Connecting to the Database:
connectDB();


// Endpoints
/**
 * @description: This is the main route for the API
 * 
 */
app.use("/api", require('./routes/api'));

// Last Route for checking if server is started or not!
app.get("/", (req, res)=>{
    res.send("<h2>Plotline Assignment!</h2><p>APIs Server Started!</p>");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
