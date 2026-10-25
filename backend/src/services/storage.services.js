const {ImageKit}=require("@imagekit/nodejs")

const imagekit =new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
})
async function uploadFile(buffer){
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName:"image.jpg"
    })
    console.log("FULL RESULT:", JSON.stringify(result, null, 2));
     return result;
}
async function deleteFile(fileId) {
    if (!fileId) return;
    try {
        await imagekit.files.delete(fileId);
    } catch (err) {
        console.error("ImageKit delete failed:", err.message);
    }
}

module.exports= {uploadFile,deleteFile}

