import { Router } from "express";
import { createJWT } from "./jwt.js";

const authRouter = Router();

authRouter.get("/token", handleGetToken);

async function handleGetToken({ query }, res) {
  let { id, username } = query;

  username = !!username ? username : "";
  id = !!Number(id) ? Math.floor(Number(id)) : 1;

  const user = { id, username, token: createJWT({ id, username }) };

  console.log("getting token for the user");
  console.log(user);

  res.status(200).json({ user });
}

export default authRouter;
