import { Router } from "express";
import { createJWT, verifyJWT } from "./jwt.js";
import db from "../db/db_mock.js";

const authRouter = Router();

authRouter.get("/signin", handleSignIn);
authRouter.get("/isJwtsCookieSet", handleIsJwtsCookieSet);

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

  // jwt cookie
  const token = createJWT(user);

  // in production the token cookie
  // should be httpOnly, secured and signed
  // also the sameSite should be set
  // probably to either strict or lax
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    signed: true,
  });

  // end request with redirection
  res.redirect("http://localhost:7001/isJwtsCookieSet");
}

function handleIsJwtsCookieSet(req, res) {
  console.log(req.user);

  if (!req.user) {
    return res.status(401).send("jwt test result: unauthorized");
  }

  res.json({ user: req.user });
}

export default authRouter;
