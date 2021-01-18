const { checkToken } = require("../helpers/jwt");
const { User, Task } = require("../models");

const authenticate = (req, res, next) => {
  try {
    const decoded = checkToken(req.headers.access_token);
    User.findOne({
      where: {
        email: decoded.email,
      },
    })
      .then((user) => {
        if (!user) {
          res.status(401).json({ message: "Please login first" });
        } else {
          req.user = { id: user.id };
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const authorize = (req, res, next) => {
  const taskId = +req.params.id;
  Task.findOne({
    where: {
      id: taskId,
    },
  })
    .then((task) => {
      if (!task || task.UserId !== req.user.id) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  authenticate,
  authorize
};
