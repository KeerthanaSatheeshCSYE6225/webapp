module.exports = (app) => {
  const assignmentController = require("../controllers/assignment.controller.js");
  const { basicAuth } = require("../middleware/authenticateToken");
  const { getStatsD } = require("../statsd/statsd");
  //app.use(basicAuth);
  app.get("/v1/assignments", [basicAuth, getStatsD()], async (req, res) => {
    if (Object.keys(req.body).length > 0) {
      return res.status(400).send("Payload not allowed");
    }
    if (Object.keys(req.query).length > 0) {
      return res.status(400).send("Query parameters not allowed");
    }
    assignmentController.getAssignments(req, res);
  });

  app.get("/v1/assignments/:id", [basicAuth, getStatsD()], async (req, res) => {
    if (Object.keys(req.body).length > 0) {
      return res.status(400).send("Payload not allowed");
    }
    assignmentController.findById(req, res);
  });

  app.post("/v1/assignments", [basicAuth, getStatsD()], async (req, res) => {
    assignmentController.createAssignment(req, res);
  });

  app.put("/v1/assignments/:id", [basicAuth, getStatsD()], async (req, res) => {
    assignmentController.updateAssignment(req, res);
  });

  app.delete(
    "/v1/assignments/:id",
    [basicAuth, getStatsD()],
    async (req, res) => {
      if (Object.keys(req.body).length > 0) {
        return res.status(400).send("Payload not allowed");
      }
      assignmentController.deleteAssignment(req, res);
    }
  );
};
