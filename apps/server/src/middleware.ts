import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface RequestWithId extends Request {
  id: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization as unknown as string;

  try {
    const payload = jwt.verify(token, process.env.JWT_PASSWORD!) as JwtPayload;

    (req as RequestWithId).id = payload.id;
    next();

  } catch (e) {
    return res.status(403).json({
      message: "You are not logged in",
    });
  }
}
