const express = require("express");
const router = express.Router();
const multer = require("multer");
const allowedMedia = require("../utilities/allowedMedia")


//configuration for Multer
const multerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        const ext = file.mimetype.split('/')[1]
        cb(null,`${file.originalname}`)
    }
})

//Multer Filter
const multerFilter = (req,file,cb)=>{
    //Accept images only
        if (!allowedMedia.includes(file.mimetype)) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true)
}


//calling the multer function
const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
});


router.post("/",upload.single('image'),async(req,res)=>{

    return res.send({message:"IMAGE OK"})
})


module.exports = router;