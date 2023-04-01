const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
let HANDLER = "false";

module.exports = {
   ANTILINK: toBool(process.env.ANTI_LINK)||false,
   LOGS: toBool(process.env.LOGS)||true,
   ANTILINK_ACTION: process.env.ANTI_LINK||"kick",
   SESSION_ID:process.env.SESSION_ID||" ",
   LANG: process.env.LANG||"en",
   HANDLERS: process.env.HANDLER === "false" || process.env.PREFIX === " null" ? "^" : "^",
   RMBG_KEY: process.env.RMBG_KEY||"false",
   BRANCH: "master",
   PACKNAME: process.env.PACKNAME||" ",
   WELCOME_MSG: process.env.WELCOME_MSG||"Hi @user Welcome to @gname",
   GOODBYE_MSG: process.env.GOODBYE_MSG||"Hi @user It was Nice Seeing you",
   DATABASE_URL: DATABASE_URL,
   DATABASE:DATABASE_URL === "./lib/database.db"? new Sequelize({dialect: "sqlite",storage: DATABASE_URL,logging: false,}): new Sequelize(DATABASE_URL, {dialect: "postgres",ssl: true,protocol: "postgres",dialectOptions: {native: true,ssl: { require: true, rejectUnauthorized: false },},logging: false,}), 
   SUDO: process.env.SUDO||"919633687665,917594898804",
   MODE:  process.env.MODE || "private",
   HEROKU_APP_NAME: process.env.HEROKU_APP_NAME||" ",
   HEROKU_API_KEY: process.env.HEROKU_API_KEY||" ",
   OWNER_NAME: process.env.OWNER_NAME||" ",
   BOT_NAME: process.env.BOT_NAME||" ",
   GPTAPIKEY: process.env.GPTAPIKEY||" ",
   WORK_TYPE: process.env.WORK_TYPE||"private",
};
