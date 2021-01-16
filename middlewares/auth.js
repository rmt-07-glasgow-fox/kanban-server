const { checkToken } = require("../helpers/jwt");
const { User, Task } = require("../models");

function authentication(req, res, next) {
  if (!req.headers.access_token) {
    next({ name: "NoToken" });
  }
  try {
    const decoded = checkToken(req.headers.access_token);
    if (!decoded.id || !decoded.email) {
      next({ name: "InvalidToken" });
    }

    User.findByPk(decoded.id).then((user) => {
      if (!user || user.email !== decoded.email) {
        next({ name: "InvalidToken" });
      } else {
        const current = {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          OrganizationId: user.OrganizationId,
        };
        req.user = current;
        next();
      }
    });
  } catch (error) {
    next({ name: "InvalidToken" });
  }
}

function orgAuthorization(req, res, next) {
  const id = +req.params.id;
  if (req.user.OrganizationId === id) {
    next();
  } else {
    // console.log("wadaw");
    next({ name: "Unauthorized" });
  }
}

function taskAuthorization(req, res, next) {
  const id = +req.params.id;

  Task.findByPk(id).then((task) => {
    if (!task) {
      next({ name: "NotFound" });
    } else if (task.UserId === req.user.id) {
      next();
    } else {
      next({ name: "Unauthorized" });
    }
  });
}

module.exports = { authentication, orgAuthorization, taskAuthorization };
