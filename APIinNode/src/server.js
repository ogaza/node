import express from "express";
import cookieParser from "cookie-parser";
import recipesRouter from "./recipes/recipesRouter.js";
import config from "./config/index.js";
import configRouter from "./config/configRouter.js";
import pagesRouter from "./pages/pagesRouter.js";
import { authRouter_v2 as authRouter, currentUser } from "./auth/index.js";

const app = express();
const port = config.port;

app.use(express.static("static"));

app.use(cookieParser(config.cookieSecret));
app.use(currentUser);
app.use("/", authRouter);
app.use("/", pagesRouter);
app.use("/api", recipesRouter);

export function appStart() {
  // creates and starts a server for our API on a defined port
  app.listen(port, function onAppListening() {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
