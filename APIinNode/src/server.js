import express from "express";
import ingredientsRouter from "./ingredientsRouter.js";
import recipesRouter from "./recipesRouter.js";
import searchRouter from "./searchRouter.js";
import config from "./config/index.js";
import configRouter from "./config/configRouter.js";
import pagesRouter from "./pages/pagesRouter.js";

const app = express();
const port = config.port;

app.use(express.static("static"));

app.use("/", configRouter);
app.use("/", pagesRouter);
app.use("/", searchRouter);
app.use("/api", ingredientsRouter);
app.use("/api", recipesRouter);

export function appStart() {
  // creates and starts a server for our API on a defined port
  app.listen(port, function onAppListening() {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}
