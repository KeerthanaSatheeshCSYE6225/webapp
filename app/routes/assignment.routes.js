module.exports = (app) => {
  //const express = require("express");
  //const router = express.Router(); // Use the Router object to define routes
  const assignmentController = require("../controllers/assignment.controller.js");
  const { basicAuth } = require("../middleware/authenticateToken");

  app.use(basicAuth);
  app.get("/assignments", async (req, res) => {
    assignmentController.createAssignment(req, res);
  });

  app.put("/assignments/:id", async (req, res) => {
    assignmentController.updateAssignment(req, res);
  });

  app.delete("/assignments/:id", async (req, res) => {
    assignmentController.deleteAssignment(req, res);
  });
};
