const db = require("../models");
const Health = db.health;
const Op = db.Sequelize.Op;
const Assignment = db.Assignment;
exports.healthCheck = async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.status(200).send();
  } catch (error) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");

    res.status(503).send();
  }
};
