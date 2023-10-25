require("dotenv").config(); // Load the dotenv library

module.exports = {
  HOST: "127.0.0.1",
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: "mysql",
};
