const db = require("../models");

// Define the Assignment model
const Assignment = db.assignment;

// Define the assignmentController object
const assignmentController = {};

assignmentController.createAssignment = async (req, res) => {
  try {
    // Check if points are between 1 and 10
    if (req.body.points < 1 || req.body.points > 10) {
      return res
        .status(400)
        .json({ message: "Points must be between 1 and 10." });
    }

    // Create the assignment (assuming req.body contains assignment data)
    const assignment = await db.Assignment.create({
      ...req.body,
      user_id: req.user.id, // Assuming you have user_id associated with the assignment
    });

    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
assignmentController.updateAssignment = async (req, res) => {
  try {
    // Find the assignment by ID
    const assignment = await db.Assignment.findByPk(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    // Only the user who created the assignment can update it (assuming user_id is associated with the assignment)
    if (assignment.user_id !== req.user.id) {
      return res.status(403).json({ message: "Permission denied." });
    }

    // Update the assignment (assuming req.body contains assignment data)
    await assignment.update(req.body);
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

assignmentController.deleteAssignment = async (req, res) => {
  try {
    // Find the assignment by ID
    const assignment = await db.Assignment.findByPk(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    // Only the user who created the assignment can delete it (assuming user_id is associated with the assignment)
    if (assignment.user_id !== req.user.id) {
      return res.status(403).json({ message: "Permission denied." });
    }

    // Delete the assignment
    await assignment.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = assignmentController;
