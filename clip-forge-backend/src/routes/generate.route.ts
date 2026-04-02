import { Router } from "express";
import { generateController } from "../controllers/generate.controller";

export const generateRouter = Router();

generateRouter.post("/", generateController);
