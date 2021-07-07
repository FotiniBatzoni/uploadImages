const express = require("express");
const router = express.Router();
const fs = require("fs");
const mainPath = require("path").resolve("./");
const { validateMedia} = require("../utilities/validateMedia");

const userDirectory = `${mainPath}/uploads`;

router.post("/",async (req,res)=> {
   if(!req.body.name || req.body.name ===""){
       res.status(422).send({message:"IMAGE NAME IS NEEDED"})
   }
    const resultMedia = await validateMedia(req.body.image)

    if (!resultMedia.isValid) {
        return res.status(422).send({message: "INVALID_MEDIA"})
    }

    try {
        fs.writeFileSync(
            `${userDirectory}/${req.body.name}.${resultMedia.ext}`,
            resultMedia.base64,
            "base64"
        );
    } catch (err) {
        return false;
    }

    return res.send({ message: "IMAGE_OK"});
});

module.exports = router