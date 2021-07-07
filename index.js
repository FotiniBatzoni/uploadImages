const express = require("express");
const basePath = require("path").resolve('./');
const fs = require("fs");

const app = express();

//make a public directory if doesn't exist
if(!fs.existsSync(`${basePath}/uploads`)){
    fs.mkdirSync(`${basePath}/uploads`)
}

require("dotenv").config();
require("./startup/logging")();
require("./startup/routes")(app);

const port = process.env.PORT || 8159;

app.listen(port, ()=>{
    console.log("Server is up listening on port:" + port);
})
