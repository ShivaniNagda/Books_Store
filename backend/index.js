
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

<<<<<<< HEAD
app.use(
  cors({
    origin: "http://localhost:5173" , // OR 3001 / your frontend port
    credentials: true,
  })
);
app.options("*", cors());
=======
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.options("*", cors());
// Source - https://stackoverflow.com/a
// Posted by Michelle Tilley, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-01, License - CC BY-SA 3.0

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

>>>>>>> 9eb9bad3ad54c3cd0bb9f58d5e22de424c7b2915

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
