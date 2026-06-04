import jwt from "jsonwebtoken";
import config from "../config/index.js";

export default function authMiddleware(req, res, next) {
  const {
    headers: { bearer },
  } = req;

  if (!bearer) {
    res.status(401);
    res.send("unauthorized");

    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.send("unauthorized");

    return;
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload;
    console.log(payload);

    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.send("unauthorized");
  }
}
