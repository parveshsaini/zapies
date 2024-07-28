import express from "express"
import cors from "cors"
import prisma from "@repo/db/client";


const app= express()
app.use(cors({
    origin: true,
}))

app.use(express.json())

app.get("/", (req, res) => {  
    res.send("Hello World")
})

app.post("/create", async(req, res) => {
    console.log(req.body)
    const {name, email, password}= req.body
    try {
        const user= await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

app.listen(8000, ()=> console.log("Server is running on port 8000"))