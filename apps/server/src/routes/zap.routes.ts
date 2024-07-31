import { request, Router } from "express";
import { authMiddleware, RequestWithId } from "../middleware.js";
import { ZapCreateSchema } from "../types/index.js";
import prisma from "@repo/db/client";

const router: Router = Router();

router.post("/", authMiddleware, async (req, res) => {
  const request = req as RequestWithId;

  const id = request.id;
  const body = req.body;

  const parsedData = ZapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const zapId = await prisma.$transaction(async (txn) => {
    const zap = await txn.zap.create({
      data: {
        userId: id,
        triggerId: "",
        name: parsedData.data.name,
        actions: {
          create: parsedData.data.actions.map((x, index) => ({
            availableActionId: x.availableActionId,
            sortingOrder: index,
            metadata: x.actionMetadata,
          })),
        },
      },
    });

    const trigger = await txn.trigger.create({
      data: {
        availableTriggerId: parsedData.data.availableTriggerId,
        zapId: zap.id,
      },
    });

    await txn.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });
  });

  return res.json({
    message: "Zap created Success",
    zapId: zapId,
  });
});

router.get("/", authMiddleware, (req, res) => {
  const request = req as RequestWithId;

  const userId = request.id;

  const zaps = prisma.zap.findMany({
    where: {
      userId,
    },
    include: {
      actions: true,
      trigger: true,
    },
  });

  return res.json({
    zaps,
  });
});

router.get("/:zapId", authMiddleware, (req, res) => {
    const request= req as RequestWithId
    const userId = request.id;

    const zap= prisma.zap.findFirst({
        where:{
            id: req.params.zapId,
            userId
        },  
        include:{
            actions: true,
            trigger: true
        }
    })

    return res.json({
        zap
    })
});

export const zapRouter = router;