const express=require("express")
const router=express.Router();
const designerController=require("../Controllers/designerController")
const brandController=require("../Controllers/brandController")
const authmiddleware=require("../middlewares/authmiddleware")
const multer=require("multer")
const upload=multer({
    storage:multer.memoryStorage()
});

router.post("/upload",authmiddleware.authDesigner, upload.single("post"),designerController.uploadPost)
router.get("/viewPost/:postId",authmiddleware.authAnyRole,designerController.getPost)
router.delete("/deletePost/:postId", authmiddleware.authDesigner, designerController.deletePost);
router.get("/feed",authmiddleware.authDesigner,designerController.getFeed)
router.get("/taggedPosts", authmiddleware.authBrand,brandController.seeTaggedPosts)




module.exports=router;


