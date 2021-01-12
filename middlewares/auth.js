const { User, Task } = require('../models');
const { checkToken } = require('../helpers/jwt.js');

const authenticate = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;
    const decoded = checkToken(access_token);
  
    const userFound = await User.findOne({ where: { email: decoded.email } });
    if(!userFound) return next({ name: 'Please login first' });

    req.userId = userFound.id;
    return next();
  }
  catch (err) {
    return next(err);
  }
};

const authorize = async (req, res, next) => {
  try {
    const id = req.params.id;
    const UserId = req.userId;
    const taskFound = await Task.findOne({ where: { id, UserId } });
    if(!taskFound) return next({ name: 'Unauthorized' });
    return next();
  }
  catch (err) {
    return next(err);
  }
};


module.exports = {
  authenticate,
  authorize
};