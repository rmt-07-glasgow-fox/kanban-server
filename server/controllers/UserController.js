const { User } = require('../models/index.js')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class UserController{
  static async register (req, res){
    try {
      let newUserData = {
        email: req.body.email,
        password: req.body.password
      }
      let newUser = await User.create(newUserData)
      let response = {
        id: newUser.id,
        email: newUser.email
      }
      res.status(201).json(response)
    } catch (error) {
      console.log(error, 'error dalam UserController.register')
      res.status(500).json({msg: 'internal server error'})
    }
  }
  static async login (req, res){
    try {
      let {email, password} = req.body
      console.log(email)
      let user = await User.findOne({
        where: {email}
      })
      if(!user){
        console.log(error, 'error dalam UserController.login')
        return res.status(401).json({msg: 'email tidak ditemukan'})
      }
      const match = comparePassword(password, user.password)
      if(match){
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = generateToken(payload)
        res.status(200).json({access_token})
      }
    } catch (error) {
      console.log(error, 'error dalam UserController.login')
      res.status(500).json({msg: 'internal server error'})
    }
  }
}

module.exports = UserController