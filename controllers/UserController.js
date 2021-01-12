const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static register(req, res, next) {
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
          next({name: "isEmail"})
        } else if (err.errors[0].validatorName === "len") {
          next({name: "len"})
        } else {
          next(err)
        }
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          next({name: "invalidEmailOrPassword"})
        }

        const match = comparePassword(password, user.password);

        const payload = {
          id: user.id,
          email: user.email,
        };

        const access_token = generateToken(payload);

        match
          ? res.status(200).json({ access_token })
          : next({name: "InvalidEmailOrPassword"});
      })
      .catch((err) => {
        next(err)
      });
  }
}

module.exports = UserController;
