const { decodedToken } = require("../helpers/jwt");
const { User, Task } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let decoded = decodedToken(req.headers.access_token)
    let user = await User.findOne({where: {email: decoded.email}})

    if (!user) {
      next({name: 'notValid'})
    } else {
      let currentUser = {
        id: user.id,
        email: user.email,
        name: user.name
      }

      req.currentUser = currentUser
      next()
    }
  } catch(error) {
    next(error)
  }
}

const authorization = async (req, res, next) => {
  try {
    let task = await Task.findByPk(req.params.id)
    if (req.currentUser.id != task.UserId) {
      next({name: 'notAuthorize'})
    } else {
      next()
    }
  } catch(error) {
    next(error)
  }
}

module.exports = { authorization, authentication }