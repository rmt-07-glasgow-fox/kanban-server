const { verifyJwt } = require("../helpers/jwt.js");
const { User, Task } = require("../models");

function authenticate(req, res, next) {
  try {
    const decoded = verifyJwt(req.headers.access_token);

    User.findOne({ where: { id: decoded.id } })
      .then((dataUser) => {
        if (!dataUser) {
          throw new Error("Email/PasswordWrong");
        } else {
          req.user = {
            id: dataUser.id,
          };
          next();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
}

function authorize(req, res, next) {
  const id = req.params.id;
  const userId = req.user.id;

  Task.findOne({ where: { id } })
    .then((dataTask) => {
      if (!dataTask) {
        console.log(dataTask);
        throw new Error("notFound");
      } else if (dataTask.UserId !== userId) {
        console.log(dataTask);
        throw new Error("forbidden");
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { authenticate, authorize };
