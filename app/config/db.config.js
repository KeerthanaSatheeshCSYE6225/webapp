require("dotenv").config(); // Load the dotenv library

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DATABASE,
  dialect: "mysql",
};
