import merge from "lodash.merge";
import { loadEnvFile } from "node:process";
import local from "./local.js";
// import staging from "./staging.js";
import prod from "./prod.js";

// load the env file variables to the process.env object
loadEnvFile("./.env");

// make sure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

const defaultConfig = {
  stage,
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  port: process.env.PORT,
  logging: false,
};

let envConfig;
// dynamically require each config depending on the stage we're in
if (stage === "production") {
  envConfig = prod;
  //   envConfig = require("./prod").default;
} else if (stage === "staging") {
  envConfig = staging;
  //   envConfig = require("./staging").default;
} else {
  envConfig = local;
  //   envConfig = require("./local").default;
}

export default merge(defaultConfig, envConfig);
