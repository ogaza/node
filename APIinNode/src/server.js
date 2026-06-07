import express from "express";
import recipesRouter from "./recipes/recipesRouter.js";
import config from "./config/index.js";
import configRouter from "./config/configRouter.js";
import pagesRouter from "./pages/pagesRouter.js";
import { authMiddleware, authRouter } from "./auth/index.js";

const app = express();
const port = config.port;

app.use(express.static("static"));

app.use("/", authRouter);
app.use("/", pagesRouter);
app.use("/api", recipesRouter);
// not sure why but if this is before
// for example ingredientsRouter
// then it will also trigger the auth middleware
app.use("/", authMiddleware, configRouter);

export function appStart() {
  // creates and starts a server for our API on a defined port
  app.listen(port, function onAppListening() {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
