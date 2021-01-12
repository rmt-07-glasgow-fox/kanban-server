const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({ name: 'LoginValidation' });
  }

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return next({ name: 'LoginFailed' });
    }

    const isPassword = comparePassword(password, user.password);

    if (isPassword) {
      const payload = { userId: user.id, userEmail: user.email };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      return res.status(200).json({
        access_token: token,
        first_name: user.first_name,
        last_name: user.last_name,
      });
    } else {
      return next({ name: 'LoginFailed' });
    }
  } catch (err) {
    return next(err);
  }
};

exports.register = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return next({ name: 'RegisterValidation' });
  }
  const body = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await User.create(body);

    const data = {
      id: user.id,
      email: user.email,
    };

    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.google = async (req, res, next) => {
  const { idToken } = req.body;
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payloadGoogle = ticket.getPayload();
    const email = payloadGoogle.email;

    const isUser = await User.findOne({ where: { email: email } });

    if (!isUser) {
      const body = {
        first_name: payloadGoogle.given_name,
        last_name: payloadGoogle.family_name,
        email: email,
        password: (Math.random() * 1000).toString() + 'password',
      };
      const newUser = await User.create(body);

      const payloadNewUser = {
        userId: newUser.id,
        userEmail: newUser.email,
      };

      const token = jwt.sign(payloadNewUser, process.env.JWT_SECRET);

      return res.status(200).json({
        accessToken: token,
        first_name: payloadGoogle.given_name,
        last_name: payloadGoogle.family_name,
      });
    } else {
      const payloadUser = {
        userId: isUser.id,
        userEmail: isUser.email,
      };

      const token = jwt.sign(payloadUser, process.env.JWT_SECRET);

      return res.status(200).json({
        accessToken: token,
        first_name: payloadGoogle.given_name,
        last_name: payloadGoogle.family_name,
      });
    }
  } catch (err) {
    next(err);
  }
};
