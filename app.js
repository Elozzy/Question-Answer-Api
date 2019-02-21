'use strict';

let express = require("express");
let app = express();
let routes =require('./route');
let bodyparser = require("body-parser").json;
let logger = require("morgan");

app.use(logger("dev"));
app.use(bodyparser());

//Mongodb

let mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/qa");

let db = mongoose.connection;

db.on("error", (err) => {
    console.error("connection error:" , err);
});

db.once("open", () => {
    console.log("db connection successful")
});

app.use("/questions", routes);

//Middleware

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error Handler

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});




//server 
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Yo!!!!!!!!!!! your server is working ");
});