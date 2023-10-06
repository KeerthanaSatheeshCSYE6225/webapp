const bcrypt = require("bcrypt");
const db = require("../models");

// Middleware for basic authentication
async function basicAuth(req, res, next) {
  console.log("inside basic auth");

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized");
  }

  const credentials = Buffer.from(authHeader.split(" ")[1], "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");

  try {
    const accounts = await db.account.findAll();
    const user = accounts.find((u) => u.email === username);

    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Unauthorized");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Error in basicAuth middleware:", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { basicAuth };
