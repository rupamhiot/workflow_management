const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const cors = require('cors');
const multer = require('multer');
// const fs = require('fs');
// const upload = multer({ dest: "./controller/CSV" });
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/') // directory where files will be saved
    },
    filename: function (req, file, cb) {
        // Set the file name to be originalname + current timestamp
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


// Use CORS middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

// Route Imports
const workflow = require("./routes/workflowRoute")
app.use("/api/v1",workflow)

app.post('/api/v1/upload',upload.single('file'),(req,res)=>{
    let filePath = req.file.path;
    // Replace backslashes with forward slashes
    filePath = filePath.replace(/\\/g, '/');
    // Send the file path in the response
    res.json(filePath);
})


// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;