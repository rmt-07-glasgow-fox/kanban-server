const { OAuth2Client } = require('google-auth-library');

const { compPass } = require('../helpers/bcrypt.js');
const { genToken, chkToken } = require('../helpers/jwt.js');
const { User } = require('../models/index.js');

class UserController {
  static async register(req, res, next) {
    try {
      const { firstname, lastname, email, password } = req.body;
      const register = await User.create({ firstname, lastname, email, password });

      return res.status(200).json({
        id: register.id,
        firstname: register.firstname,
        lastname: register.lastname,
        email: register.email
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const login = await User.findOne({ where: { email } });

      if (!login) throw { name: 'invalidLogin' };

      const chkPass = compPass(password, login.password);

      if (!chkPass) throw { name: 'invalidLogin' };

      const payload = {
        id: login.id,
        firstname: login.firstname,
        lastname: login.lastname,
        email: login.email,
        profpic: login.profpic
      };
      const access_token = genToken(payload);

      return res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    };
  };

  static async getUser(req, res, next) {
    try {
      const decode = chkToken(req.headers.access_token);
      const getUser = await User.findOne({ where: { id: decode.id } });

      return res.status(200).json({
        id: getUser.id,
        firstname: getUser.firstname,
        lastname: getUser.lastname,
        email: getUser.email,
        profpic: getUser.profpic
      });
    } catch (err) {
      next(err);
    };
  };

  static gLogin(req, res, next) {
    const id_token = req.headers.id_token;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    let firstname, lastname, email, profpic;

    client.verifyIdToken({ idToken: id_token, audience: process.env.GOOGLE_CLIENT_ID })
      .then(ticket => {
        const payload = ticket.getPayload();
        firstname = payload.given_name;
        lastname = payload.family_name;
        email = payload.email;
        profpic = payload.picture;

        return User.findOne({ where: { email } });
      })
      .then(user => {
        if (!user) {
          return User.create({
            firstname,
            lastname,
            email,
            profpic,
            password: Math.floor(Math.random() * 999999) + "pass"
          });
        } else {
          return user;
        };
      })
      .then(user => {
        const payload = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          profpic: user.profpic
        };
        const access_token = genToken(payload);

        return res.status(200).json({ access_token });
      })
      .catch(err => console.log(err));
  };
};

module.exports = UserController;