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
  const { name, points, num_of_attempts, deadline } = req.body;

  const allowedFields = ["name", "points", "num_of_attempts", "deadline"];
  const extraFields = Object.keys(req.body).filter(
    (key) => !allowedFields.includes(key)
  );

  if (extraFields.length > 0) {
    return res
      .status(400)
      .json({ msg: `Extra fields not allowed: ${extraFields.join(", ")}` });
  } else if (!name || typeof name !== "string") {
    return res
      .status(400)
      .json({ msg: "Name field required and need to be a String format" });
  } else if (!points || typeof points !== "number" || points % 1 !== 0) {
    return res
      .status(400)
      .json({ msg: "Points field required and need to be in integer format" });
  } else if (
    !num_of_attempts ||
    typeof num_of_attempts !== "number" ||
    num_of_attempts % 1 !== 0
  ) {
    return res
      .status(400)
      .json({ msg: "Attempt field required and need to be in integer format" });
  } else if (!deadline || !isValidDeadlineFormat(deadline)) {
    return res.status(400).json({
      msg: 'Invalid deadline format. Please use the format "2023-10-09T23:42:18.000Z"',
    });
  }

  try {
    const assignObj = await Assignment.create({
      name,
      points,
      num_of_attempts,
      deadline,
      userId: req.userId,
    });
    logger.log("info", "Assignment created successfully");
    res.status(201).send(assignObj);
  } catch (error) {
    logger.log("error", "Error creating assignment");
    res.status(400).json(error.message);
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
  logger.log("info", "Update assignment request received");
  const id = req.params.id;
  const { name, points, num_of_attempts, deadline } = req.body;

  const allowedFields = ["name", "points", "num_of_attempts", "deadline"];
  const extraFields = Object.keys(req.body).filter(
    (key) => !allowedFields.includes(key)
  );

  if (extraFields.length > 0) {
    return res
      .status(400)
      .json({ msg: `Extra fields not allowed: ${extraFields.join(", ")}` });
  } else if (name && typeof name !== "string") {
    return res
      .status(400)
      .json({ msg: "Name field needs to be in String format" });
  } else if (points && (typeof points !== "number" || points % 1 !== 0)) {
    return res
      .status(400)
      .json({ msg: "Points field needs to be in integer format" });
  } else if (
    num_of_attempts &&
    (typeof num_of_attempts !== "number" || num_of_attempts % 1 !== 0)
  ) {
    return res
      .status(400)
      .json({ msg: "Attempt field needs to be in integer format" });
  } else if (deadline && !isValidDeadlineFormat(deadline)) {
    return res.status(400).json({
      msg: 'Invalid deadline format. Please use the format "2023-10-09T23:42:18.000Z"',
    });
  }

  Assignment.update(req.body, {
    where: {
      id: id,
      userId: req.userId,
    },
  })
    .then((num) => {
      if (num == 1) {
        logger.log("info", "Assignment updated successfully");
        res.status(204).send({
          message: "Assignment was updated successfully.",
        });
      } else {
        logger.log("error", "Error updating assignment");
        res.status(400).send({
          message: `Cannot update Assignment with id=${id}. Maybe Assignment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      logger.log("error", "Error updating Assignment");
      res.status(500).send({
        message: "Error updating Assignment with id=" + id,
      });
    });
};

function isValidDeadlineFormat(deadline) {
  const deadlineRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return deadlineRegex.test(deadline);
}

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
