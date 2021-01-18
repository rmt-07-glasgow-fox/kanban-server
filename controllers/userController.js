const { User } = require('../models');
const { checkPassword } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');
const { OAuth2Client } = require('google-auth-library');

class UserController {

  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = { email, password };
      const createdUser = await User.create(newUser);
      return res.status(201).json({ message: 'Success create user' });
    }
    catch (err) {
      return next(err);
    }    
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body; 

      const userFound = await User.findOne({ where: {email} }); 
      if(!userFound) return next({ name: 'Invalid email/password' });

      const match = checkPassword(password, userFound.password);
      if(!match) return next({ name: 'Invalid email/password' });

      const payload = { id: userFound.id, email: userFound.email };
      const access_token = generateToken(payload);
      
      return res.status(200).json({ access_token });
    }
    catch (err) {
      return next(err);
    }    
  }

  static async loginGoogle(req, res, next) {
    const { idToken } = req.body;
    const audience = process.env.CLIENT_ID;
    const client = new OAuth2Client(audience);
    async function verify() {
      const ticket = await client.verifyIdToken({ idToken, audience });
      let payload = ticket.getPayload();
      const email = payload.email;
      const user = await User.findOne({ where: { email } });      
      if(!user) {
        const password = Math.random() * 1000 + ' random password';
        const newUser = { email, password};
        user = await User.create(newUser);
      }
      payload = {
        id: user.id,
        email: user.email 
      }; 
      const access_token = generateToken(payload);
      return res.status(200).json({access_token, email});
    }
    verify()
    .catch(err => {
      console.log(err);
      next(err);
    });
  }

}

module.exports = UserController;