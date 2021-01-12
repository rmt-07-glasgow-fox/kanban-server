const { verifyJwt } = require("../helpers/jwt.js");
const { User, Task } = require("../models");

function authenticate(req, res, next) {
  try {
    const decoded = verifyJwt(req.headers.access_token);

    User.findOne({ where: { id: decoded.id } })
      .then((dataUser) => {
        req.user = {
          id: dataUser.id,
        };
        next();
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
}

function authorize(req, res, next) {
  const id = req.params.id;
  const userId = req.user.id;

  Task.findOne({ where: { id } })
    .then((dataTask) => {
      console.log(dataTask);
      if (!dataTask) {
        throw { name: "dataNotFound" };
      } else if (dataTask.UserId !== userId) {
        console.log(dataTask);
        throw { name: "forbidden" };
      } else {
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { authenticate, authorize };
