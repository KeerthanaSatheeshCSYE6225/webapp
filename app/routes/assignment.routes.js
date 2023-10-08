module.exports = (app) => {
  const assignmentController = require("../controllers/assignment.controller.js");
  const { basicAuth } = require("../middleware/authenticateToken");

  //app.use(basicAuth);
  app.get("/v1/assignments", basicAuth, async (req, res) => {
    if (Object.keys(req.body).length > 0) {
      return res.status(400).send("Payload not allowed");
    }
    console.log("karan");
    assignmentController.getAssignments(req, res);
  });

  app.get("/v1/assignments/:id", basicAuth, async (req, res) => {
    if (Object.keys(req.body).length > 0) {
      return res.status(400).send("Payload not allowed");
    }
    assignmentController.findById(req, res);
  });

  app.post("/v1/assignments", basicAuth, async (req, res) => {
    console.log("karan");
    assignmentController.createAssignment(req, res);
  });

  app.put("/v1/assignments/:id", basicAuth, async (req, res) => {
    assignmentController.updateAssignment(req, res);
  });

  app.delete("/v1/assignments/:id", basicAuth, async (req, res) => {
    if (Object.keys(req.body).length > 0) {
      return res.status(400).send("Payload not allowed");
    }
    assignmentController.deleteAssignment(req, res);
  });
};
