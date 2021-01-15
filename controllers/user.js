const { User, Organization } = require("../models");
const { checkPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class UserController {
  static register(req, res, next) {
    const { username, password, email, firstName, lastName } = req.body;

    User.create({
      username,
      password,
      email,
      firstName,
      lastName,
      OrganizationId: null,
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
    
  }

  static userInfo(req, res, next) {
    const id = req.user.id;
    User.findByPk(id, {
      attributes: { exclude: ['password'] },
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
    // console.log(OrganizationId);
    // console.log(id);

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
