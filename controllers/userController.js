const {OAuth2Client} = require('google-auth-library');
const {User} = require("../models")
const {comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class UserController {
  static register(req,res,next) {
    const {email,password,name} = req.body
    User.create({
      email, password, name
    })
      .then(data => {
        const result = {
          id: data.id,
          email: data.email,
          name: data.name
        }
        return res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  // static login(req, res, next) {
  //   const loginInput = {
  //     email: req.body.email,
  //     password: req.body.password
  //   }
  //   console.log(loginInput);
  //   User.findOne({
  //     where: {
  //       email: loginInput.email
  //     }
  //   })
  //     .then(user => {
  //       console.log("----------- USER ---------------");
  //       console.log(user);
  //       console.log("--------------------------");
  //       if (!user) {
  //         next({ name: 'unauthorized' })
  //       }
  //       const match = comparePassword(loginInput.password, user.password)
  //       if (match) {
  //         const payload = {
  //           id: user.id,
  //           email: user.email
  //         }
  //         const access_token = generateToken(payload)
  //         return res.status(200).json({access_token})
  //       } else {
  //         next({ name: 'unauthorized' })
  //       }
  //     })
  //     .catch(err => {
  //       console.log("----------- ERROR ---------------");
  //       console.log(err);
  //       console.log("--------------------------");
  //       next(err)
  //     })
  // }

  static async login(req,res,next) {
    try {
      const {email,password} = req.body
      const user = await User.findOne({
        where: {
          email:email
        }
      })
      if(!user) {
        throw {
          message: "Invalid email / password"
        }
      }
      const match = comparePassword(password, user.password)
      if(match) {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({
          access_token: access_token
        })
      } else {
        throw {
          message: "Invalid email / password"
        }
      }
    }
    catch(err) {
      next(err)
    }
  }
  static googleSignIn(req,res,next) {
    const {id_token} = req.body;
    let email = null;
    let name = null;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      console.log(ticket, "ticket");
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.given_name;
      return User.findOne({
        where: {
          email
        }
      })
    })
    .then(user => {
      console.log(user,"user");
      if(!user) {
        return User.create({
          name,
          email,
          password: `${Math.floor(Math.random()*100)}secret`
        });
      } else {
        return user
      }
    })
    .then(user => {
      console.log(user)
      const payload = {email: user.email, id:user.id}
      const access_token = generateToken(payload)
      res.status(200).json({access_token})
    })
    .catch(err => {
      console.log(err,"error");
      next(err)
    })
  }
}

module.exports = UserController