const express = require("express")

const error = require("../middleware/error");

const uploadImage = require("../routes/uploadImage");
const uploadImageFD = require("../routes/uploadImageFD")

//to handle res.header
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Methods",
            "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
        );
        next();
    });


    //When enabled, Express attempts to determine the IP address of the client connected
    //through the front-facing proxy, or series of proxies.
    app.enable("trust proxy");

    app.use(express.json({ limit: "20mb" }));

    app.use("/api/upload",uploadImage);
    app.use("/api/image",uploadImageFD);


    //from winston
    app.use(error);
}