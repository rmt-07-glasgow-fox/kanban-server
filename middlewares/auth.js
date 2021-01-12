const { User } = require('../models')
const { checkToken } = require('../helpers/jwt')

function authenticate(req, res, next) {
  try {
    let decoded = checkToken(req.headers.access_token)
    User.findOne({
      where: { email: decoded.email }
    })
    .then(data => {
      if(!data) {
        next({ name: 'needLogin'})
      } else {
        req.user = data
        next()
      }
    })
    .catch(err => {
      next(err)
    })
  }
  catch(err) {
    next({ name: 'needLogin'})
  }
}

module.exports = {
  authenticate
}