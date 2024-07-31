import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import { userRouter } from "./routes/user.routes.js";
import { zapRouter } from "./routes/zap.routes.js";


const app= express()
app.use(cors({
    origin: true,
}))

app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/zap", zapRouter)

app.listen(8000, ()=> console.log("Server is running on port 8000", process.env.JWT_PASSWORD))