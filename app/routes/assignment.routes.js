module.exports = (app) => {
  const assignmentController = require("../controllers/assignment.controller.js");
  const { basicAuth } = require("../middleware/authenticateToken");

  //app.use(basicAuth);
  app.get("/v1/assignments", basicAuth, async (req, res) => {
    client.increment('get assignments');
    if (Object.keys(req.body).length > 0) {
      return res.status(400).send("Payload not allowed");
    }
    if (Object.keys(req.query).length > 0) {
      return res.status(400).send("Query parameters not allowed");
    }
    assignmentController.getAssignments(req, res);
  });

  app.get("/v1/assignments/:id", basicAuth, async (req, res) => {
    client.increment('get assignment by id');
    if (Object.keys(req.body).length > 0) {
      return res.status(400).send("Payload not allowed");
    }
    assignmentController.findById(req, res);
  });

  app.post("/v1/assignments", basicAuth, async (req, res) => {
    client.increment('create a assignment');
    assignmentController.createAssignment(req, res);
  });

  app.put("/v1/assignments/:id", basicAuth, async (req, res) => {
    client.increment('update an assignment');
    assignmentController.updateAssignment(req, res);
  });

  app.delete("/v1/assignments/:id", basicAuth, async (req, res) => {
    client.increment('delete an assignment');
    if (Object.keys(req.body).length > 0) {
      return res.status(400).send("Payload not allowed");
    }
    assignmentController.deleteAssignment(req, res);
  });
};
