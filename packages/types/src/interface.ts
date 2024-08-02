import { z } from "zod";
import { ZapCreateSchema } from "./zod.js";

export type IZap= z.infer<typeof ZapCreateSchema>;