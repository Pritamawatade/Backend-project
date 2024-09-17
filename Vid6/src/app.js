import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public")) // it tells that static files will store in public folder
app.use(cookieParser()); // it is basically used to perform the crud operation on cookie by server

// import user routes

import userRoute from "./routes/user.routes.js";

app.use("/api/v1/users", userRoute)
export {app} 