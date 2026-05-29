import { Router } from "express";
import config from "./index.js";

const configRouter = Router();

configRouter.get("/config", handleConfigGet);

function handleConfigGet(req, res) {
  const { stage } = config;

  res.json({ stage });
}

export default configRouter;
