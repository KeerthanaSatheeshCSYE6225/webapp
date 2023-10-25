require("dotenv").config(); // Load the dotenv library

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: process.env.DIALECT,
  pool: {
    max: process.env.POOL_MAX,
    min: process.env.POOL_MIN,
    acquire: process.env.ACQUIRE,
    idle: process.env.IDLE,
  },
};
