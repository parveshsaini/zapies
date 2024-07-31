import prisma from "@repo/db/client";
import { Router } from "express";

const router: Router= Router()

router.get("/", (req, res)=> {
    const triggers= prisma.availableTrigger.findMany({
        select:{
            id: true,
            name: true,
            image: true,

        }
    })

    res.json({
        triggers
    })
})

export const triggerRouter= router;