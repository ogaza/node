import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { verifyJWT } from "./jwt.js";

// not used yet
// if enabled must be used in pair with the currentUser
// middleware
export const authenticate = async (req, res, next) => {
  console.log(req.user);

  if (!req.user) {
    return res
      .status(401)
      .redirect(
        `/login?redirect=${req.originalUrl}&error=You must be logged in to view that page.`,
      );
  }

  next();
};

/**
 * This middleware sets the user property on the request object
 * and on the the response locals object.
 */
export const currentUser = async (req, res, next) => {
  const { token } = req.signedCookies;

  try {
    // verify the jwt token
    const user = verifyJWT(token);

    req.user = user;
    res.locals.user = user;
  } catch (error) {
    console.error(error);
  }

  next();
};

// currently not used
// use authenticate middleware or
// merge them together
// this one checks the request headers
// containing berer token
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
