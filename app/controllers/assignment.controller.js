const winston = require("winston");
const logger = require("../logger/logger"); // Update the path to your logger file

const db = require("../models");
const Assignment = db.assignment;

exports.getAssignments = async (req, res) => {
  logger.info("fetch all assignments get");
  try {
    Assignment.findAll({
      attributes: { exclude: ["user_id"] },
    }).then((data) => {
      logger.info("Retrieved assignments successfully.");
      res.send(data);
    });
  } catch (err) {
    logger.error("Error retrieving assignments.");
    res.status(500).send({
      message: "Some error occurred while retrieving assignments.",
    });
  }
};

exports.createAssignment = async (req, res) => {
  const assignment = {
    user_id: req.user.id,
    name: req.body.name,
    points: req.body.points,
    num_of_attemps: req.body.num_of_attemps,
    deadline: req.body.deadline,
  };

  if (req.body.points < 1 || req.body.points > 10) {
    logger.log("error", "Invalid points entered.");
    return res
      .status(400)
      .json({ message: "Points must be between 1 and 10." });
  }
  if (!isNaN(req.body.name) || typeof req.body.name !== "string") {
    throw new Error("Invalid name value: " + assignment.name);
  }

  if (
    !Number.isInteger(req.body.num_of_attemps) ||
    !Number.isFinite(req.body.num_of_attemps) ||
    num_of_attemps < 1
  ) {
    logger.error("Invalid num_of_attemps value:", num_of_attemps);
    return res
      .status(400)
      .json({ message: "num_of_attemps must be a positive whole number" });
  }

  try {
    const data = await Assignment.create(assignment, {
      attributes: { exclude: ["user_id"] },
    });
    logger.info("Assignment created successfully.");
    res.send(data);
  } catch (err) {
    logger.error("Error creating assignment.");
    console.error("Error creating assignment:", err.message);
    res.status(500).send({
      message: "Some error occurred while creating the Assignment.",
    });
  }
};

exports.findById = async (req, res) => {
  logger.info("fetch assignment by id get");
  try {
    const data = await Assignment.findByPk(req.params.id, {
      attributes: { exclude: ["user_id"] },
    });
    if (data) {
      logger.info("Assignment found by ID.");
      res.send(data);
    } else {
      logger.error("Assignment not found.");
      res.status(404).send("Assignment not found");
    }
  } catch (error) {
    logger.error("Error finding assignment by ID.");
    res.status(500).send("Internal Server Error");
  }
};

exports.updateAssignment = async (req, res) => {
  logger.info("update assignment by id put");
  try {
    const id = req.params.id;
    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      logger.error("Assignment not found for updating.");
      return res.status(404).json({ message: "Assignment not found." });
    }
    if (assignment.user_id !== req.user.id) {
      logger.error("Permission denied for updating assignment.");
      return res.status(403).json({ message: "Permission denied." });
    }

    const points = req.body.points; // Define the 'points' variable
    const name = req.body.name;
    const num_of_attempts = req.body.num_of_attemps; // Define the 'num_of_attemps' variable

    if (!Number.isInteger(points) || points < 1 || points > 10) {
      logger.error("Invalid points value:", points);
      return res.status(400).json({
        message: "Points must be between 1 and 10 and proper integer",
      });
    }

    if (!isNaN(name) || typeof name !== "string") {
      throw new Error("Invalid name value: " + name);
    }
    if (
      !Number.isInteger(num_of_attempts) ||
      !Number.isFinite(num_of_attempts) ||
      num_of_attemps < 1
    ) {
      logger.error("Invalid num_of_attemps value:", num_of_attemps);
      return res
        .status(400)
        .json({ message: "num_of_attemps must be a positive whole number" });
    }

    await Assignment.update(
      {
        name: name,
        points: points, // Use the defined 'points' variable here
        num_of_attemps: num_of_attempts,
        deadline: req.body.deadline,
      },
      { where: { id: req.params.id } }
    ).then(() => {
      logger.info("Assignment updated successfully.");
      res.status(200).send("Updated successfully a customer with id = " + id);
    });
  } catch (err) {
    logger.error("Error updating assignment.");
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  logger.info("delete assignment by id delete");
  try {
    // Find the assignment by ID
    const id = req.params.id;
    const assignment = await Assignment.findByPk(id);

    if (!assignment) {
      logger.error("Assignment not found for deletion.");
      return res.status(404).json({ message: "Assignment not found." });
    }

    if (assignment.user_id !== req.user.id) {
      logger.error("Permission denied for deleting assignment.");
      return res.status(403).json({ message: "Permission denied." });
    }

    await Assignment.destroy({
      where: { id: req.params.id },
    }).then((num) => {
      if (num == 1) {
        logger.info("info", "Assignment deleted successfully.");
        res.send({ message: "Assignment was deleted successfully!" });
      } else {
        logger.error("Cannot delete Assignment with id.");
        res.send({ message: `Cannot delete Assignment with id=${id}.` });
      }
    });
  } catch (err) {
    logger.error("Error deleting assignment.");
    res.status(400).json({ message: err.message });
  }
};
