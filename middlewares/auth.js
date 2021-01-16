const { verifyToken } = require('../helpers/jwt');
const { User, Task } = require('../models');

async function authentication(req, res, next) {
  try {
    const authParams = verifyToken(req.headers.access_token);
    const currentUser = await User.findOne({
      where: {
        id: authParams.id,
        email: authParams.email,
      },
    });
    if (!currentUser) {
      return next({
        name: "UnregisteredUser"
      })
    }
    req.user = currentUser;
    next();
  }
  catch {
    next(err);
  }
}

async function authorization(req, res, next) {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const appAuth = await Task.findOne({
      where: {
        id: id,
      },
    });
    if(!appAuth) {
      next({
        name: "NotFound"
      });
    }
    else if (appAuth.UserId === userId) {
      next();
    }
    else {
      next({
        name: "Unauthorized"
      });
    }
  }
  catch {
    next(err);
  }
}

module.exports = {
  authentication,
  authorization
};