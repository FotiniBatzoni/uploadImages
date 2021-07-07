const allowedMedia = require("../utilities/allowedMedia");
const fs = require("fs");
const fileType =require("file-type")

async function validateMedia(media) {

    const base64result = media.split(",")[1] ? media.split(",")[1] : "";

    let isValid = true;

    //To extract mimeInfo
    const mimeInfo = await fileType.fromBuffer(Buffer.from(base64result, "base64"));

    if(mimeInfo === undefined){
        return { isValid: false}
    }

    if(!mimeInfo){
        return { isValid:false}
    }

    if(!allowedMedia.includes(mimeInfo.mime)){
        return false
    }

    if (
        mimeInfo.ext !== "jpg" &&
        mimeInfo.ext !== "jpeg" &&
        mimeInfo.ext !== "png" &&
        mimeInfo.ext !== "gif"
    ){
        return false;
    }

    return {
        ext:mimeInfo.ext,       //ext:jpg
        mime:mimeInfo.mime,     //mime:image/jpeg
        isValid:isValid,        //isValid:true
        base64: base64result    //base64: the base64 string
    }
}

module.exports.validateMedia = validateMedia;