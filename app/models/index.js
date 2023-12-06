const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("cloud_db", "root", "Karan@123", {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.account = require("./account.model.js")(sequelize, Sequelize);
db.assignment = require("./assignment.model.js")(sequelize, Sequelize);
db.submission = require("./submission.model.js")(sequelize, Sequelize);
module.exports = db;
