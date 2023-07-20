const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require('./helper/connectDB');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();


// Endpoints
app.use("/api", require('./routes/api'));

// Check Main URL
app.get("/", (req, res)=>{
    res.send("<h2>Plotline Assignment!</h2><p>APIs Server Started!</p>");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
