const csv = require("csvtojson");
//const UserAccount = require("../models/account.model");
const bcrypt = require("bcrypt");
const AccountController = require("../controllers/account.controller.js");
const fs = require("fs");
const Papa = require("papaparse");
require("../models/index.js");
const { account } = require("../models/index.js");

const loadCsvMiddleware = async (req, res, next) => {
  // Load the CSV file.
  console.log("Loading CSV data...");

  const csvData = await csv().fromFile("/opt/csye6225/users.csv");
  console.log("testing...", csvData);

  // Create new users based on the information provided in the CSV file.
  for (const user of csvData) {
    console.log(user);

    // Check if the password property exists.
    if (!user.password) {
      continue;
    }

    const { first_name, last_name, password, email } = user;

    // Hash the password before storing it in the database.
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("reached here");
    try {
      // Create a new user account.
      await account.create({
        first_name,
        last_name,
        password: hashedPassword,
        email,
      });
    } catch (error) {
      // Ignore the error if the user account already exists.
      if (error.name === "SequelizeUniqueConstraintError") {
        continue;
      } else {
        throw error;
      }
    }
    // Call the next middleware in the chain.
    next();
  }
};

module.exports = loadCsvMiddleware;
