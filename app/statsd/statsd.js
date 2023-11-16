const StatsD = require("node-statsd");

const client = new StatsD({ host: "127.0.0.1", port: 8125 });

const getStatsD = () => {
  return (req, res, next) => {
    const metricName = `api.${req.method.toLowerCase()}.${req.originalUrl}`;
    client.increment(metricName);
    next();
  };
};

// Function to end the StatsD client
const endStatsD = () => {
  return (req, res, next) => {
    client.close();
    next();
  };
};

module.exports = {
  getStatsD,
  endStatsD,
};
