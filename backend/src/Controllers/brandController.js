const prisma = require("../config/db");
 
async function seeTaggedPosts(req, res) {
    try {
        const brandId = req.user.id;
 
        const posts = await prisma.post.findMany({
            where: { taggedBrandId: brandId },
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
                designer: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                        bio: true,
                    },
                },
            },
        });
 
        res.status(200).json({
            message: "Tagged posts fetched successfully",
            count: posts.length,
            posts,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong while fetching tagged posts" });
    }
}
async function searchBrands(req, res) {
    try {
        const { name } = req.query;
 
        if (!name || name.trim().length === 0) {
            return res.status(200).json({ brands: [] });
        }
 
        const brands = await prisma.user.findMany({
            where: {
                role: "BRAND",
                name: { contains: name, mode: "insensitive" },
            },
            select: {
                id: true,
                name: true,
                avatarUrl: true,
            },
            take: 10,
        });
 
        res.status(200).json({ brands });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong while searching brands" });
    }
}

 
module.exports = { seeTaggedPosts, searchBrands};
 