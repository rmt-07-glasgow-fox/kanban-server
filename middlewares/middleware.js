const {
  User
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