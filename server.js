const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const loadCsvMiddleware = require("./app/middleware/load_csv.middleware");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded form data
const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/health.routes")(app);
require("./app/middleware/load_csv.middleware")(app);
require("./app/routes/account.routes")(app);
require("./app/routes/assignment.routes")(app);

app.use((req, res) => {
  // Set a 404 status code and send an empty response
  res.status(404).send();
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;
