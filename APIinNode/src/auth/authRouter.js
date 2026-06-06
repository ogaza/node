import { Router } from "express";
import { createJWT } from "./jwt.js";
import db from "../db.js";

const authRouter = Router();

authRouter.get("/token", handleGetToken);
authRouter.get("/signin", handleSignIn);

async function handleSignIn({ query }, res) {
  const { username } = query;
  console.log("user to fiind: ", username);

  const {
    rows: [user],
  } = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);
  console.log("user found:", user);

  if (!user) {
    console.log("401");
    res.status(401);
    res.send("unauthorized");
    return;
  }

  const token = createJWT(user);

  res.json({ token });
}

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
