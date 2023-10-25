require("dotenv").config(); // Load the dotenv library

const maxPool = parseInt(process.env.POOL_MAX);
const minPool = parseInt(process.env.POOL_MIN);
const acquire = parseInt(process.env.ACQUIRE);
const idle = parseInt(process.env.IDLE);

if (isNaN(maxPool) || isNaN(minPool) || isNaN(acquire) || isNaN(idle)) {
  throw new Error(
    "Environment variables are not set properly or do not contain valid integer values."
  );
}

module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: "mysql",
  pool: {
    max: maxPool,
    min: minPool,
    acquire: acquire,
    idle: idle,
  },
};
