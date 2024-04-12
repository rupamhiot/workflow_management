// server.js
const app = require("./app")
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handale Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1);
});

// config
dotenv.config({ path: "./config/config.env" });

// Connecting to DB
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})
// unhandaled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down th server due to unhandaled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    })
})
