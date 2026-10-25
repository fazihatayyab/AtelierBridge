const prisma = require("../config/db");
const {uploadFile} = require("../services/storage.services");
 
async function setProfile(req, res) {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        const { bio, aestheticDescription, contactNumber } = req.body;

            if (aestheticDescription !== undefined && userRole !== "BRAND") {
            return res.status(403).json({
                message: "Only brands can set an aesthetic description",
            });
        }


        let avatarUrl;
        if (req.file) {
            const uploadResult = await uploadFile(req.file.buffer);
            avatarUrl = uploadResult.url;
        }
 
        const updated = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(bio !== undefined && { bio }),
                ...(contactNumber !== undefined && { contactNumber }),
                ...(userRole === "BRAND" && aestheticDescription !== undefined && { aestheticDescription }),
                ...(avatarUrl && { avatarUrl }),

            },
        });
 
        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updated.id,
                name: updated.name,
                email: updated.email,
                role: updated.role,
                bio: updated.bio,
                contactNumber: updated.contactNumber,
                avatarUrl: updated.avatarUrl,
                aestheticDescription: updated.aestheticDescription,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong while updating the profile" });
    }
}
 
async function getProfile(req, res) {
    try {
        const { userId } = req.params;
 
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                avatarUrl: true,
                bio: true,
                contactNumber: true,
                role: true,
                aestheticDescription: true,
                createdAt: true,
                posts: {
                    orderBy: { createdAt: "desc" },
                    select: {
                        id: true,
                        imageUrl: true,
                        caption: true,
                        colors: true,
                        fabricType: true,
                        silhouette: true,
                        workType: true,
                        createdAt: true,
                    },
                },
                taggedPosts: {
                    orderBy: { createdAt: "desc" },
                    select: {
                        id: true,
                        imageUrl: true,
                        caption: true,
                        createdAt: true,
                        designer: {
                            select: { id: true, name: true, avatarUrl: true },
                        },
                    },
                },
            },
        });
 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
 
        res.status(200).json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong while fetching the profile" });
    }
}
 
module.exports = { setProfile, getProfile };
 
