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
