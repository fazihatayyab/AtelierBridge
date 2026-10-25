const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const prisma = require("../config/db"); 
 
async function registerUser(req, res) {
    try {
        const { name, email, password, role } = req.body;
 
        if (!role || !["DESIGNER", "BRAND"].includes(role)) {
            return res.status(400).json({ message: "role must be DESIGNER or BRAND" });
        }
 
        const isUserAlreadyExists = await prisma.user.findFirst({
            where: {
                OR: [{ email }]
            }
        });
 
        if (isUserAlreadyExists) {
            return res.status(409).json({ message: "User already exists" });
        }
 
        const hash = await bcrypt.hash(password, 10);
 
        const user = await prisma.user.create({
            // furthur data :{..} used it tells the prisma that this will insert into user table
            data: {
                name,
                email,
                password: hash,
                role
            }
        });
 
        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
 
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
 
        const session = await prisma.session.create({
            data: {
                userId: user.id,
                refreshTokenHash,
                userAgent: req.headers["user-agent"],
                ip: req.ip,
                expiresAt
            }
        });
 
        const accessToken = jwt.sign(
            { id: user.id, role: user.role, sessionId: session.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );
 
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            // 7days
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
 
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong during registration" });
    }
}
 

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
 
        const user = await prisma.user.findUnique({ where: { email } });
 
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
 
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
 
        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
 
        const session = await prisma.session.create({
            data: {
                userId: user.id,
                refreshTokenHash,
                userAgent: req.headers["user-agent"],
                ip: req.ip,
                expiresAt
            }
        });
 
        const accessToken = jwt.sign(
            { id: user.id, role: user.role, sessionId: session.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );
 
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
 
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong during login" });
    }
}
 
async function refreshTokenn(req, res) {
    const refreshToken = req.cookies.refreshToken;
 
    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized: no refresh token" });
    }
 
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
 
        const session = await prisma.session.findFirst({
            where: {
                refreshTokenHash,
                revoked: false
            }
        });
 
        if (!session) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
 
        if (session.expiresAt < new Date()) {
            return res.status(401).json({ message: "Session expired, please log in again" });
        }
 
        const accessToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );
 
        const newRefreshToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");
        const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
 
        await prisma.session.update({
            where: { id: session.id },
            data: {
                refreshTokenHash: newRefreshTokenHash,
                expiresAt: newExpiresAt
            }
        });
                const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                avatarUrl: true,
            },
        });
 
        if (!user) {
            return res.status(401).json({ message: "User no longer exists" });
        }
 

 
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
 
        res.status(200).json({
            message: "Access token refreshed",
            accessToken,
            user
        });
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ message: "Invalid or expired refresh token" });
    }
}
 
async function logoutUser(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
 
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token not found" });
        }
 
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
 
        const session = await prisma.session.findFirst({
            where: { refreshTokenHash }
        });
 
        if (!session) {
            return res.status(400).json({ message: "Invalid refresh token" });
        }
 
        await prisma.session.update({
            where: { id: session.id },
            data: { revoked: true }
        });
 
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong during logout" });
    }
}
 
async function logOutAll(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
 
        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token not found" });
        }
 
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
 
        await prisma.session.updateMany({
            where: {
                userId: decoded.id,
                revoked: false
            },
            data: {
                revoked: true
            }
        });
 
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "Logged out from all devices successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ message: "Invalid or expired refresh token" });
    }
}
 
module.exports = { registerUser, loginUser, logoutUser, refreshTokenn, logOutAll };
 
