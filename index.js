const express = require("express");
const basePath = require("path").resolve('./');
const fs = require("fs");
const CronJob = require("cron").CronJob;
const emptyUploads = require("./utilities/cron/emptyUploads")

const app = express();

//make a public directory if doesn't exist
if(!fs.existsSync(`${basePath}/uploads`)){
    fs.mkdirSync(`${basePath}/uploads`)
}

require("dotenv").config();
require("./startup/logging")();
require("./startup/routes")(app);

let emptyUploadsJob = new CronJob(
    process.env.CHECK_TIME_CRON,
    emptyUploads,
    null,
    true,
    "Europe/Athens"
);
emptyUploadsJob.start();

const port = process.env.PORT || 8202;

app.listen(port, ()=>{
    console.log("Server is up listening on port:" + port);
})
