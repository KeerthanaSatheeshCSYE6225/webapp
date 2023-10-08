//const express = require("express");
module.exports = (app) => {
  const accountController = require("../controllers/account.controller.js");

  app.post("/create", (req, res) => {
    accountController.create(req, res);
  });

  app.get("/all", (req, res) => {
    if (Object.keys(req.body).length > 0) {
      return res.status(400).send("Payload not allowed");
    }
    accountController.getAll(req, res);
  });
};
