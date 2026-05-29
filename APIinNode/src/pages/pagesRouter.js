import { Router } from "express";
import path from "path";

const pagesRouter = Router();

pagesRouter.get("/", handleRootGet);

function handleRootGet(req, res) {
  // sending back an HTML file that a browser can render on the screen.
  res.sendFile(path.resolve("./src/pages/index.html"));
}

export default pagesRouter;
