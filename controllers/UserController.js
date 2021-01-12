const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt.js");
const { generateJwt } = require("../helpers/jwt.js");

class UserController {
  static userRegister(req, res, next) {
    const { name, email, password } = req.body;

    User.create({ name, email, password })
      .then((dataUser) => {
        return res.status(201).json({
          id: dataUser.id,
          email: dataUser.email,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static userLogin(req, res, next) {
    const { email, password } = req.body;

    console.log(email);
    User.findOne({ where: { email } })
      .then((dataUser) => {
        console.log(dataUser, "MASUK");
        if (!dataUser) {
          throw new Error("Wrong Email");
        }
        const checkPassword = comparePassword(password, dataUser.password);
        if (!checkPassword) {
          throw new Error("Wrong Password");
        }
        const payload = {
          id: dataUser.id,
          email: dataUser.email,
        };
        const access_token = generateJwt(payload);
        return res.status(200).json({ access_token });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = UserController;
