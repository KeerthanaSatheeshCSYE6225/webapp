const db = require("../models");

// Define the Assignment model
const Assignment = db.assignment;

exports.getAssignments = async (req, res) => {
  try {
    Assignment.findAll({
      attributes: { exclude: ["user_id"] }, // Exclude the user_id field
    }).then((data) => {
      res.send(data);
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving assignments.",
    });
  }
};

exports.createAssignment = async (req, res) => {
  // Check if points are between 1 and 10
  if (req.body.points < 1 || req.body.points > 10) {
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

  Assignment.create(assignment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.findById = async (req, res) => {
  try {
    const data = await Assignment.findByPk(req.params.id, {
      attributes: { exclude: ["user_id"] }, // Exclude the 'user_id' field from the response
    });
    if (data) {
      res.send(data);
    } else {
      res.status(404).send("Assignment not found");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    // Find the assignment by ID
    const id = req.params.id;

    const assignment = await Assignment.findByPk(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    if (assignment.user_id !== req.user.id) {
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
      res.status(200).send("updated successfully a customer with id = " + id);
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }
    console.log("userid is ", req.user.id);

    if (assignment.user_id !== req.user.id) {
      return res.status(403).json({ message: "Permission denied." });
    }

    // Delete the assignment
    await Assignment.destroy({
      where: { id: req.params.id },
    }).then((num) => {
      if (num == 1) {
        res.send({
          message: "Assignment was deleted successfully!",
        });
      } else {
        res.send({
          message: "Cannot delete Assignment with id=${id}.",
        });
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
