const db = require("../models"); // Import your Sequelize database instance
const Account = db.account;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  //console.log(res);
  const { first_name, last_name, password, email } = req.body;

  // Hash the password before storing it in the database.
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Create a new user account.
  const account = Account.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: hashedPassword,
    email: req.body.email,
  });

  Account.create(account)
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

exports.getAll = async (req, res) => {
  Account.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.getById = async (req, res) => {
  try {
    const account = await db.Account.findByPk(req.params.id);
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const account = await db.Account.findByPk(req.params.id);
    await account.update(req.body);
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const account = await db.Account.findByPk(req.params.id);
    await account.destroy();
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
