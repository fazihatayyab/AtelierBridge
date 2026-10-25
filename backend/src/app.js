const express=require("express")
const app=express();
const cors=require("cors")
const authRoutes=require("../src/routes/authRoutes")
const postRoutes=require("../src/routes/postRoutes")
const profileRoutes=require("../src/routes/profileRoutes")
const brandRoutes = require("./routes/brandsSearchingRoutes");

const cookieParser=require("cookie-parser")

app.use(cors({origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)
app.use("/api/profile",profileRoutes)
app.use("/api/brand", brandRoutes);





module.exports=app