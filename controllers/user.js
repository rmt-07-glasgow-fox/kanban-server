const { User, Organization } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static register(req, res, next) {
    const { username, password, email, firstName, lastName } = req.body;

    User.create({
      username,
      password,
      email,
      firstName,
      lastName,
      OrganizationId: 1,
    })
      .then((response) => {
        res.status(201).json({
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          OrganizationId: response.OrganizationId,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { input, password } = req.body;

    User.findOne({
      where: { username: input },
    })
      .then((user) => {
        if (!user) {
          return User.findOne({
            where: { email: input },
          });
        } else {
          return user;
        }
      })
      .then((user) => {
        if (!user) {
          next({ name: "LoginNotFound" });
        } else if (!checkPassword(password, user.password)) {
          next({ name: "WrongPassword" });
        } else {
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            OrganizationId: user.OrganizationId,
          };
          const access_token = createToken(payload);
          res.status(200).json({ access_token, userId: user.id });
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static loginGoogle(req, res, next) {
    const token = req.body.id_token;
    const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID;
    let username, fullName, email, firstName, lastName;

    const client = new OAuth2Client(OAUTH_CLIENT_ID);
    client
      .verifyIdToken({
        idToken: token,
        audience: OAUTH_CLIENT_ID,
      })
      .then((ticket) => {
        const payload = ticket.getPayload();
        username = payload.email;
        email = payload.email;
        firstName = payload.given_name;
        lastName = payload.family_name;

        return User.findOne({
          where: { email },
        });
      })
      .then((user) => {
        if (!user) {
          return User.create({
            username,
            password: Math.random() * 1000 + "pass Google",
            email,
            firstName,
            lastName,
            OrganizationId: 1,
          });
        } else {
          return user;
        }
      })
      .then((user) => {
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          OrganizationId: user.OrganizationId,
        };
        const access_token = createToken(payload);
        res.status(200).json({ access_token, userId: user.id });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static userInfo(req, res, next) {
    const id = req.user.id;
    User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: Organization,
    })
      .then((response) => {
        res.status(200).json({ user: response });
      })
      .catch((err) => {
        next(err);
      });
  }

  static selectOrg(req, res, next) {
    console.log("masuk add organization");
    const { OrganizationId } = req.body;
    const { id } = req.user;

    User.update(
      {
        OrganizationId,
      },
      {
        where: { id },
        returning: true,
      }
    )
      .then((response) => {
        if (response[0] === 1) {
          const updated = {
            id: response[1][0].id,
            username: response[1][0].username,
            email: response[1][0].email,
            firstName: response[1][0].firstName,
            lastName: response[1][0].lastName,
            OrganizationId: response[1][0].OrganizationId,
          };
          res.status(200).json({ updated });
          req.user.OrganizationId = OrganizationId;
        } else {
          next({ name: "FailUpdate" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
