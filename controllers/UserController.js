const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static register(req, res) {
    const { email, password } = req.body;
    const newUser = { email, password };

    User.create(newUser)
      .then((user) => {
        const response = {
          id: user.id,
          email: user.email,
        };

        res.status(201).json(response);
      })
      .catch((err) => {
        if (err.errors[0].validatorName === "isEmail") {
          res.status(400).json({ message: err.message });
        } else if (err.errors[0].validatorName === "len") {
          res.status(400).json({ message: err.message });
        } else {
          res
            .status(500)
            .json({ message: "Internal Server Error", error: err.message });
        }
      });
  }

  static login(req, res) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          res.status(401).json({ message: "Invalid email / password" });
        }

        const match = comparePassword(password, user.password);

        const payload = {
          id: user.id,
          email: user.email,
        };

        const access_token = generateToken(payload);

        match
          ? res.status(200).json({ access_token })
          : res.status(401).json({ message: "Invalid email / password" });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
}

module.exports = UserController;
