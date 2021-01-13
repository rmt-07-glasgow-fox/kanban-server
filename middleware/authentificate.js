const {verifyToken} = require("../helpers/jwt")

exports.authetificate = (req, res, next) => {
  try {
    if (req.params.access_token) {
      const user = verifyToken(req.params.access_token)
      if (user) {
        req.user = user
        next()
      } else {
        throw {
          code: 403,
          message: `User Invalid`
        }
      }
    } else {
      throw {
        code: 400,
        message: `Login First`
      }
    }
  } catch (error) {
    next(error)
  }
}