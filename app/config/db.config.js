module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Karan@123",
  DB: "cloud_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
// const dotenv = require("dotenv");
// dotenv.config();

// module.exports = {
//   HOST: process.env.HOST,
//   USER: process.env.USER,
//   PASSWORD: process.env.PASSWORD,
//   DB: process.env.DB,
//   dialect: mysql,
//   pool: {
//     max: process.env.pool_max,
//     min: process.env.pool_min,
//     acquire: process.env.pool_acquire,
//     idle: process.env.pool_idle,
//   },
// };
