const { verifyToken } = require('../helpers/jwt');
const { User, /* AppModel */ } = require('../models');

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
    const idApp = req.params.id;
    const userId = req.user.id;
    const appAuth = await /* AppModel *//* .findOne */({
      where: {
        id: idApp,
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