import config from "../config/index.js";
import jwt from "jsonwebtoken";

export function createJWT({ id, username }) {
  return jwt.sign({ id, username }, config.jwtSecret);
}

export function verifyJWT(token) {
  return jwt.verify(token, config.jwtSecret);
}
