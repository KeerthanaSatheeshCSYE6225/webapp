module.exports = (app) => {
  const healthController = require("../controllers/health.controller.js");
  const { getStatsD, endStatsD } = require("../statsd/statsd");

  app.get("/healthz", getStatsD(), (req, res) => {
    if (Object.keys(req.body).length > 0) {
      return res.status(400).send("Payload not allowed");
    }
    if (Object.keys(req.query).length > 0) {
      return res.status(400).send("Query parameters not allowed");
    }
    // Call the health check controller function
    healthController.healthCheck(req, res);
  });

  app.post("/healthz", (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.status(405).send();
  });

  app.put("/healthz", (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.status(405).send();
  });

  app.delete("/healthz", (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.status(405).send();
  });

  app.patch("/healthz", (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.status(405).send();
  });

  app.use(endStatsD());
};
