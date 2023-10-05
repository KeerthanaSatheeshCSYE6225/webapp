//const express = require("express");
module.exports = (app) => {
  const accountController = require("../controllers/account.controller.js");
  var router = require("express").Router();

  app.post("/create", (req, res) => {
    accountController.create(req, res);
  });

  app.get("/all", (req, res) => {
    accountController.getAll(req, res);
  });

  app.get("/:id", (req, res) => {
    accountController.getById(req, res);
  });

  app.put("/:id", (req, res) => {
    accountController.update(req, res);
  });

  app.delete("/:id", (req, res) => {
    accountController.delete(req, res);
  });
};
