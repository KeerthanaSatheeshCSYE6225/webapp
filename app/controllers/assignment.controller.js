const db = require("../models");
const logger = require("../logger/logger");
// Define the Assignment model
const Assignment = db.assignment;

exports.getAssignments = async (req, res) => {
  logger.info("fetch all assignments get");
  try {
    const assignments = await Assignment.findAll({
      attributes: { exclude: ["user_id"] }, // Exclude the user_id field
    });

    logger.info("Successfully fetched all assignments");
    res.send(assignments);
  } catch (err) {
    logger.error("Failed to fetch assignments:", err.message);
    res.status(500).send({
      message: "Some error occurred while retrieving assignments.",
    });
  }
};

exports.createAssignment = async (req, res) => {
  logger.info("create assignment post");
  // Check if points are between 1 and 10
  if (
    !Number.isInteger(points) ||
    req.body.points < 1 ||
    req.body.points > 10
  ) {
    logger.error("Invalid points value:", req.body.points);
    return res
      .status(400)
      .json({ message: "Points must be between 1 and 10." });
  }
  if (!isNaN(assignment.name) || typeof assignment.name !== "string") {
    throw new Error("Invalid name value: " + assignment.name);
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
      attributes: { exclude: ["user_id"] }, // Exclude the 'user_id' field from the response
    });

    logger.info("Successfully created assignment:", data.id);
    res.send(data);
  } catch (err) {
    logger.error("Failed to create assignment:", err.message);
    res.status(500).send({
      message: "Some error occurred while creating the Assignment.",
    });
  }
};

exports.findById = async (req, res) => {
  logger.info("fetch assignment by id get");
  try {
    const assignment = await Assignment.findByPk(req.params.id, {
      attributes: { exclude: ["user_id"] }, // Exclude the 'user_id' field from the response
    });

    if (assignment) {
      logger.info(`Successfully fetched assignment with id: ${assignment.id}`);
      res.send(assignment);
    } else {
      logger.error(`Assignment with id: ${req.params.id} not found`);
      res.status(404).send("Assignment not found");
    }
  } catch (err) {
    logger.error(
      `Failed to fetch assignment with id: ${req.params.id}`,
      err.message
    );
    res.status(500).send("Internal Server Error");
  }
};

exports.updateAssignment = async (req, res) => {
  logger.info("upadate assignment by id put");
  try {
    // Find the assignment by ID
    const id = req.params.id;
    const assignment = await Assignment.findByPk(id);

    if (!assignment) {
      logger.error(`Assignment with id: ${id} not found`);
      return res.status(404).json({ message: "Assignment not found." });
    }

    if (assignment.user_id !== req.user.id) {
      logger.error(`Unauthorized access to update assignment with id: ${id}`);
      return res.status(403).json({ message: "Permission denied." });
    }

    if (
      !Number.isInteger(points) ||
      req.body.points < 1 ||
      req.body.points > 10
    ) {
      logger.error("Invalid points value:", req.body.points);
      return res
        .status(400)
        .json({ message: "Points must be between 1 and 10." });
    }
    if (!isNaN(assignment.name) || typeof assignment.name !== "string") {
      throw new Error("Invalid name value: " + assignment.name);
    }

    await Assignment.update(
      {
        name: req.body.name,
        points: req.body.points,
        num_of_attemps: req.body.num_of_attemps,
        deadline: req.body.deadline,
      },
      { where: { id: id } }
    );

    logger.info(`Successfully updated assignment with id: ${id}`);
    res.status(200).send({ message: "Assignment updated successfully." });
  } catch (err) {
    logger.error(`Failed to update assignment with id: ${id}`, err.message);
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
      logger.error(`Assignment with id: ${id} not found`);
      return res.status(404).json({ message: "Assignment not found." });
    }

    if (assignment.user_id !== req.user.id) {
      logger.error(`Unauthorized access to update assignment with id: ${id}`);
      return res.status(403).json({ message: "Permission denied." });
    }

    // Delete the assignment
    // Delete the assignment
    await Assignment.destroy({
      where: { id: req.params.id },
    });

    logger.info(`Successfully deleted assignment with id: ${req.params.id}`);
    res.send({
      message: "Assignment was deleted successfully!",
    });
  } catch (err) {
    logger.error(
      `Failed to delete assignment with id: ${req.params.id}`,
      err.message
    );
    res.status(500).json({ message: err.message });
  }
};
