import prisma from "@repo/db/client";
import { Router } from "express";

const router: Router= Router()

router.get("/", (req, res)=> {
    const actions= prisma.availableAction.findMany({
        select:{
            id: true,
            name: true,
            image: true,

        }
    })

    res.json({
        actions
    })
})

export const actionRouter= router;