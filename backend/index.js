
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import authRoutes from  "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import bookRoutes from './routes/book.route.js';
import { verifyToken } from './middleware/verifyToken.js';
import { checkAuth } from './controllers/auth.controller.js';



const app = express();
const _dirname = path.resolve();
console.log("_dirname ",_dirname);
console.log("process.env.NODE_ENV ",process.env.NODE_ENV);

app.use(
  cors({
    origin: "http://localhost:5173" ||  "http://localhost:3000" , // OR 3001 / your frontend port
    credentials: true,
  })
);
app.options("*", cors());

app.use(cookieParser());

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use("/api/auth",authRoutes);
// app.use(verifyToken,checkAuth);

app.use("/api/book",bookRoutes);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname,"/frontend/dist")));
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
    })
}

 export default app;