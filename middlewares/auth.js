const { chkToken } = require('../helpers/jwt.js');
const { User } = require('../models/index.js');

let authenticate = async (req, res, next) => {
  try {
    const decode = chkToken(req.headers.access_token);
    const user = await User.findOne({ where: { email: decode.email } });

    if (!user) throw { name: 'unauthorize' };

    req.user = user;
    return next();
  } catch (err) {
    next(err);  
  };
};

let authorize = async (req, res, next) => {

};

module.exports = { authenticate, authorize };