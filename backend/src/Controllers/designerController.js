const prisma = require("../config/db");
const {uploadFile,deleteFile} = require("../services/storage.services");
const { generateAiTags } = require("./aiController");
 
async function uploadPost(req, res) {
    try {
        const { caption, taggedBrandId } = req.body;
        const designerId = req.user.id;
 
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }
 
      
        const [uploadResult, aiTags] = await Promise.all([
            uploadFile(req.file.buffer),
            generateAiTags(req.file.buffer, req.file.mimetype, caption),
        ]);

        const imageUrl = uploadResult.url;
        const imageFileId = uploadResult.fileId;

 
        const post = await prisma.post.create({
            data: {
                imageUrl,
                imageFileId, 
                caption,
                designerId,
                taggedBrandId: taggedBrandId || null,
                colors: aiTags.colors,
                fabricType: aiTags.fabricType,
                silhouette: aiTags.silhouette,
                workType: aiTags.workType,
            },
        });
 
        res.status(201).json({
            message: "Post uploaded successfully",
            post,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong while uploading the post" });
    }
}
 
async function getPost(req, res) {
    try {
        const { postId } = req.params;
 
        if (!postId) {
            return res.status(400).json({ message: "postId is required" });
        }
 
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                designer: { select: { id: true, name: true, avatarUrl: true } },
                taggedBrand: { select: { id: true, name: true, avatarUrl: true } },
            },
        });
 
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
 
        res.status(200).json({ post });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong while fetching the post" });
    }
}
 
async function getFeed(req, res) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                designerId: { not: req.user.id }, // don't show my own posts in the public feed
            },
            orderBy: { createdAt: "desc" },
            include: {
                designer: { select: { id: true, name: true, avatarUrl: true } },
                taggedBrand: { select: { id: true, name: true, avatarUrl: true } },
            },
        });
 
        res.status(200).json({ posts });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong while fetching the feed" });
    }
}
async function deletePost(req, res) {
    try {
        const { postId } = req.params;
        const designerId = req.user.id;
 
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });
 
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
 
        if (post.designerId !== designerId) {
            return res.status(403).json({ message: "You can only delete your own posts" });
        }
        
        await deleteFile(post.imageFileId);
        

        await prisma.post.delete({
            where: { id: postId },
        });
 
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong while deleting the post" });
    }
}

 
module.exports = { uploadPost, getPost, getFeed,deletePost };
 
