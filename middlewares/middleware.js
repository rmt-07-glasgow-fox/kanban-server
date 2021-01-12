const {
  User,
  Task
} = require("../models")
const {
  verifyToken
} = require("../helpers/jwt")

const authentication = (req, res, next) => {
  try {
    let decoded = verifyToken(req.headers.access_token)
    User.findOne({
      where: {
        id: decoded.id,
        email: decoded.email
      }
    })
      .then(data => {
        if (!data) {
          return next({
            name: "WrongLogin"
          })
        }
        req.user = data
        return next()
      })
      .catch(err => {
        next(err)
      })
    
  } catch (err) {
    next({
      name: "NotLoggedIn"
    })
  }
}

const authorization = (req, res, next) => {
  let userId = req.user.id
  let id = req.params.id
  Task.findOne({
    where: {
      id
    }
  })
  .then(data => {
    if (!data) {
      return next({
        name: "NotFound"
      })
    } else if (userId === data.userId) {
      next()
    } else {
      return next({
        name: "Unauthorized"
      })
    }
  })
  .catch(err =>{
    next(err)
  })
}

module.exports = {
  authentication,
  authorization
}