const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt.js");
const { generateJwt } = require("../helpers/jwt.js");
const { OAuth2Client } = require('google-auth-library');


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
        return next(err);
      });
  }

  static userLogin(req, res, next) {
    const { email, password } = req.body;

    console.log(email);
    User.findOne({ where: { email } })
      .then((dataUser) => {
        if (!dataUser) {
          throw { name: "invalidEmailPassword" };
        }
        const checkPassword = comparePassword(password, dataUser.password);
        if (!checkPassword) {
          throw { name: "invalidEmailPassword" };
        }
        const payload = {
          id: dataUser.id,
          email: dataUser.email,
        };
        const access_token = generateJwt(payload);
        return res.status(200).json({ access_token });
      })
      .catch((err) => {
        // console.log(err, "ALL ERROR============");
        // console.log(err.name, "ERROR NAME============");
        // console.log(err.message, "ERROR Message============");
        return next(err);
        // throw { name: "invalidEmailPassword" };
      });
  }

  static loginGoogle(req, res, next) {
    const { id_token } = req.body
    let payloadGoogle
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {
        payloadGoogle = ticket.getPayload();
        return User.findOne({where: {email: payloadGoogle.email}})
      })
      .then(user => {
        if (!user) {
          return User.create({
            name: payloadGoogle.name,
            email: payloadGoogle.email,
            password: (Math.random() * 1e8).toString().slice(0, 7)
          }) 
        } else {
          return user
        }
      })
      .then(user => {
        let payloadUser = {
          id: user.id,
          email: user.email
        }
        const accessToken = generateJwt(payloadUser);
        return res.status(200).json({ access_token: accessToken });
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }
}

module.exports = UserController;
