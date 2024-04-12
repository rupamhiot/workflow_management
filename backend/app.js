const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const cors = require('cors');


// Use CORS middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

// Route Imports
const workflow = require("./routes/workflowRoute")
app.use("/api/v1",workflow)


// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;