import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  return res.status(200).json({
    ok: true,
    service: "clipforge-backend",
    timestamp: new Date().toISOString(),
  });
});
