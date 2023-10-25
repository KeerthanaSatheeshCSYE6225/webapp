require("dotenv").config(); // Load the dotenv library

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: process.env.DIALECT,
  pool: {
    max: parseInt(process.env.POOL_MAX),
    min: parseInt(process.env.POOL_MIN),
    acquire: parseInt(process.env.ACQUIRE),
    idle: parseInt(process.env.IDLE),
  },
};
