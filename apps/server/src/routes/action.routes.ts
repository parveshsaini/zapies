import prisma from "@repo/db/client";
import { Router } from "express";

const router: Router= Router()

router.get("/", async(req, res)=> {
    const actions= await prisma.availableAction.findMany()

    return res.json({
        actions
    })
})

export const actionRouter= router;