// const express = require("express");
// const app = express();
// // Middleware for basic authentication

// async function basicAuth(req, res, next) {
//   console.log("inside basic auth 1");

//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     console.log("inside basic auth 2");

//     return res.status(401).send("Unauthorized");
//   }

//   const credentials = Buffer.from(authHeader.split(" ")[1], "base64").toString(
//     "utf-8"
//   );

//   const [username, password] = credentials.split(":");

//   console.log("username", username);

//   console.log("password", password);

//   // Fetch all account records from the database

//   const accounts = await db.account.findAll();

//   console.log("all accounts", accounts);

//   const user = accounts.find((u) => u.email === username);

//   if (!user) {
//     console.log("inside basic auth 3");

//     return res.status(401).send("Unauthorized");
//   }

//   console.log("user.password**", user.password);

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     console.log("inside basic auth 4");

//     return res.status(401).send("Unauthorized");
//   }

//   req.user = user;

//   next();
// }

// app.use("/v1", basicAuth);
// module.exports = basicAuth;
// const bcrypt = require("bcrypt");
// const db = require("../models");

// // Middleware for basic authentication
// async function basicAuth(req, res, next) {
//   console.log("inside basic auth 1");

//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     console.log("inside basic auth 2");

//     return res.status(401).send("Unauthorized");
//   }

//   const credentials = Buffer.from(authHeader.split(" ")[1], "base64").toString(
//     "utf-8"
//   );

//   const [username, password] = credentials.split(":");

//   console.log("username", username);
//   console.log("password", password);

//   try {
//     // Fetch all account records from the database
//     const accounts = await db.account.findAll();

//     console.log("all accounts", accounts);

//     const user = accounts.find((u) => u.email === username);

//     if (!user) {
//       console.log("inside basic auth 3");

//       return res.status(401).send("Unauthorized");
//     }

//     console.log("user.password**", user.password);

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       console.log("inside basic auth 4");

//       return res.status(401).send("Unauthorized");
//     }

//     req.user = user;

//     next();
//   } catch (err) {
//     console.error("Error in basicAuth middleware:", err);
//     res.status(500).send("Internal Server Error");
//   }
// }

// module.exports = basicAuth; // Export the basicAuth middleware function

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
