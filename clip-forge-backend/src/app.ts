import cors from "cors";
import express from "express";
import { generateRouter } from "./routes/generate.route";
import { healthRouter } from "./routes/helath.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);

app.use("/api/generate", generateRouter);

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

export default app;
