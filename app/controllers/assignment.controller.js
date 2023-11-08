const winston = require("winston");
const logger = require("../logger/logger"); // Update the path to your logger file

const db = require("../models");
const Assignment = db.assignment;

exports.getAssignments = async (req, res) => {
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
      message:
        err.message || "Some error occurred while retrieving assignments.",
    });
  }
};

exports.createAssignment = async (req, res) => {
  // Check if points are between 1 and 10
  if (req.body.points < 1 || req.body.points > 10) {
    logger.log("error", "Invalid points entered.");
    return res
      .status(400)
      .json({ message: "Points must be between 1 and 10." });
  }

  const assignment = {
    user_id: req.user.id,
    name: req.body.name,
    points: req.body.points,
    num_of_attemps: req.body.num_of_attemps,
    deadline: req.body.deadline,
  };

  try {
    const data = await Assignment.create(assignment, {
      attributes: { exclude: ["user_id"] },
    });
    logger.info("Assignment created successfully.");
    res.send(data);
  } catch (err) {
    logger.error("Error creating assignment.");
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Assignment.",
    });
  }
};

exports.findById = async (req, res) => {
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

    await Assignment.update(
      {
        name: req.body.name,
        points: req.body.points,
        num_of_attemps: req.body.num_of_attemps,
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
  try {
    const assignment = await Assignment.findByPk(req.params.id);

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
