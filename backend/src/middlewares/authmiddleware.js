const jwt = require("jsonwebtoken");
 
function getTokenFromRequest(req) {
    // Expecting: Authorization: Bearer <accessToken>
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }
    return authHeader.split(" ")[1];
}
 
async function authDesigner(req, res, next) {
    const accessToken = getTokenFromRequest(req);
 
    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
 
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
 
        if (decoded.role !== "DESIGNER") {
            return res.status(403).json({ message: "You cannot access this resource" });
        }
 
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
}
 
async function authBrand(req, res, next) {
    const accessToken = getTokenFromRequest(req);
 
    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
 
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
 
        if (decoded.role !== "BRAND") {
            return res.status(403).json({ message: "You do not have access" });
        }
 
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
}
async function authAnyRole(req, res, next) {
    const accessToken = getTokenFromRequest(req);

    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        if (decoded.role !== "BRAND" && decoded.role !== "DESIGNER") {
            return res.status(403).json({ message: "You do not have access" });
             }

        req.user = decoded;
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(401).json({ message: "Unauthorized" });
    }
}
module.exports={authDesigner,authBrand,authAnyRole}






