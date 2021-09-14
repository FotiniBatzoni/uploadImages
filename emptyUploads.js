const fs = require("fs");
const path = require('path').resolve("./");


module.exports = () => {

    let files =  fs.readdirSync(`${path}/uploads`)
    for (const file of files) {
        fs.unlinkSync(`${path}/uploads/${file}`);
    }
}