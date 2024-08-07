
import { Router } from "express";
import { authMiddleware, RequestWithId } from "../middleware.js";
import prisma from "@repo/db/client"
import jwt from "jsonwebtoken";
import { SigninSchema, SignupSchema } from "../types/index.js";
import bcrypt from "bcrypt";

const router: Router = Router();

router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        console.log(parsedData.error);
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const userExists = await prisma.user.findFirst({
        where: {
            email: parsedData.data.email
        }
    });

    if (userExists) {
        return res.status(403).json({
            message: "User already exists"
        })
    }

    const hashedPassword= await bcrypt.hash(parsedData.data.password, 10);

    const user= await prisma.user.create({
        data: {
            email: parsedData.data.email,
            password: hashedPassword,
            name: parsedData.data.name
        }
    })

    // await sendEmail();

    const token = jwt.sign({
        id: user.id
    },  process.env.JWT_PASSWORD!);

    return res.json({
        message: "Success",
        user: user,
        token: token
    });

})

router.post("/login", async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if(!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const hashedPassword= await bcrypt.hash(parsedData.data.password, 10);


    const user = await prisma.user.findFirst({
        where: {
            email: parsedData.data.email
        }
    });
    
    if (!user) {
        return res.status(403).json({
            message: "User not found"
        })
    }

    const passwordMatch = await bcrypt.compare(parsedData.data.password, user.password);

    if (!passwordMatch) {
        return res.status(403).json({
            message: "Sorry credentials are incorrect"
        })
    }

    const token = jwt.sign({
        id: user.id
    },  process.env.JWT_PASSWORD!);

    res.json({
        token: token,
    });
})

router.get("/", authMiddleware, async (req, res) => {
    const request= req as RequestWithId;
    const id = request.id;
    const user = await prisma.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });

    return res.json({
        user
    });
})

export const userRouter = router;