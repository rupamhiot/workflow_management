const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong Mongodb Id cast error
    if(err.name === "CastError"){
        const message = `Resource noy found. Invalid $(err.path)`;
        err = new ErrorHandler(message,400);
    }
    // Mongoose Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
      }

    // wrong Json Web Token Error

    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid`;
        err = new ErrorHandler(message,400);
    }

    // wrong Json Web Token Expire Error

    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is Expired,Try again`;
        err = new ErrorHandler(message,400);
    }
    


    res.status(err.statusCode).json({
        sucess:false,
        error: err.message,
    });
};