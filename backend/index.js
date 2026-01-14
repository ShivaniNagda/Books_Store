
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import swagger from 'swagger-ui-express';
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"

import authRoutes from  "./routes/auth.route.js";
import bookRoutes from './routes/book.route.js';
import { verifyToken } from './middleware/verifyToken.js';
import { checkAuth } from './controllers/auth.controller.js';
import {chatBox} from "./utils/chatBox.js";



// import apiDocs from "./swagger.json" with {type:'json'};



const app = express();
const _dirname = path.resolve();
console.log("_dirname ",_dirname);
console.log("process.env.NODE_ENV ",process.env.NODE_ENV);


app.use(
  cors({
    origin: "http://localhost:5173" || "https://readify-2tfq.onrender.com" || "http://localhost:3000" ,
    credentials: true,
  })
);



app.use(cookieParser());

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use("/api/docs", swagger.serve, swagger.setup(apiDocs));

app.use("/api/auth",authRoutes);


app.use("/api/book",verifyToken,bookRoutes);



app.post("/chat", chatBox);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname,"/frontend/dist")));
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
    })
}

 export default app;
