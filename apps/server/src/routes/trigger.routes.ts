import prisma from "@repo/db/client";
import { Router } from "express";

const router: Router= Router()

router.get("/", async(req, res)=> {
    const triggers= await prisma.availableTrigger.findMany({})

     res.json({
        triggers
    })
})

export const triggerRouter= router;