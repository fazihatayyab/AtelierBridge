const express=require("express")
const router=express.Router();
const profileController=require("../Controllers/profileController")
const authmiddleware=require("../middlewares/authmiddleware")
const multer=require("multer")
const upload=multer({
    storage:multer.memoryStorage()
});



router.patch("/profileSetup",authmiddleware.authAnyRole, upload.single("avatarUrl"),profileController.setProfile)
router.get("/:userId",authmiddleware.authAnyRole,profileController.getProfile)


module.exports=router;


