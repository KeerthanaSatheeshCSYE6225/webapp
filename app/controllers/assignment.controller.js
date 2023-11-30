const winston = require("winston");
const logger = require("../logger/logger"); // Update the path to your logger file

const AWS = require("aws-sdk");
const sns = new AWS.SNS();
const db = require("../models");
const Assignment = db.assignment;
const Submission = db.submission;
const publishToSNS = require("../models/notification.model");

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
  if (req.body.points < 1 || req.body.points > 10) {
    logger.error("Points must be between 1 and 10.");
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

  Assignment.create(assignment, {
    attributes: { exclude: ["user_id"] }, // Exclude the 'user_id' field from the response
  })
    .then((data) => {
      logger.info("Assignment created successfully.");
      res.send(data);
    })
    .catch((err) => {
      logger.error("Error creating assignment:", err.message);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Assignment.",
      });
    });
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
  try {
    logger.info("Finding assignment by ID...");
    const id = req.params.id;

    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      logger.error("Assignment not found.");
      return res.status(404).json({ message: "Assignment not found." });
    }

    if (assignment.user_id !== req.user.id) {
      logger.error("Permission denied.");
      return res.status(403).json({ message: "Permission denied." });
    }

    logger.info("Updating assignment...");
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
      res.status(200).send("updated successfully a customer with id = " + id);
    });
  } catch (err) {
    logger.error("Error updating assignment:", err.message);
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

exports.submitAssignment = async (req, res) => {
  try {
    console.log("Submit assignment request received");

    const { submission_url } = req.body;

    const allowedFields = ["submission_url"];
    const extraFields = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key)
    );

    if (extraFields.length > 0) {
      return res
        .status(400)
        .json({ msg: `Extra fields not allowed: ${extraFields.join(", ")}` });
    } else if (!submission_url || !isValidUrl(submission_url)) {
      return res.status(400).json({
        msg: 'Invalid submission URL format. Please use the format "https://www.example.com"',
      });
    }

    const assignment = await Assignment.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id, // Assuming user id is available in the request
      },
    });

    if (!assignment) {
      console.error("Assignment not found");
      return res.status(404).json({ msg: "Assignment not found" });
    }

    if (new Date() > assignment.deadline) {
      return res
        .status(400)
        .json({ msg: "Assignment deadline has passed. Submission rejected." });
    }

    const submissionCount = await Submission.count({
      where: { assignment_id: req.params.id, user_id: req.user.id },
    });

    if (submissionCount >= assignment.num_of_attemps) {
      return res
        .status(400)
        .json({ msg: "Retry limit exceeded. Submission rejected." });
    }

    const submission = await Submission.create({
      assignment_id: req.params.id,
      submission_url,
      user_id: req.user.id, // Assuming you have a user_id field in Submission model
    });

    const message = {
      url: submission_url,
      userEmail: req.user.email, // Assuming you have the user's email in request
      assignmentId: req.params.id,
    };

    // await sns
    //   .publish({
    //     TopicArn: "arn:aws:sns:region:accountId:topicName", // Replace with your topic ARN
    //     Message: JSON.stringify(message),
    //   })
    //   .promise();
    await publishToSNS(process.env.TOPIC_ARN, message).promise();

    console.log("Assignment submitted successfully");
    res.status(201).send(submission);
  } catch (error) {
    console.error("Error submitting assignment", error);
    res.status(400).json(error.message);
  }
};
