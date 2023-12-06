const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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
