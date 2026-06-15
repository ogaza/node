import { Router } from "express";
import { createJWT } from "./jwt.js";
import db from "../db/db.js";

const authRouter = Router();

authRouter.get("/token", handleGetToken);
authRouter.get("/signin", handleSignIn);

// this gets the username from the query string
// looks for the user in the db 
// once found cretes the jwt and sends it back
// in the response
// to do:
// the jwt should be sent back in the cookie 
// as was done in the WebSecurity project of the 
// Vanill JS repo
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

  // below is the code from the Vanilla JS repo:
  // const { secret: jwtEncryptionSecret } = jwtConfig;
  // var token = jwt.sign({ username }, jwtEncryptionSecret, {
  //   expiresIn: "20s"
  // });

  res.json({ token });
}

// this method simply shows how a jwt token can look like
// takes the id and username from the query string 
// cretes the jwt token and seds the response with the jwt
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
