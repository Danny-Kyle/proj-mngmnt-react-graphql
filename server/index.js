const express = require ('express');
require ('dotenv').config();
const port = process.env.PORT || 3125


const app = express()

app.listen(port, console.log("Running on port " + port))