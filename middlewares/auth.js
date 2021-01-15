const { checkToken } = require ('../helpers/jwt')
const { User, Task } = require ('../models/index')

async function authenticate (req, res, next) {
  try {
    let decoded = checkToken (req.headers.access_token)

    let data = await User.findOne ({
      where: {
        email: decoded.email
      }
    })
    if (!data) {
      res.status (403).json ({message: 'Please login first'})
    } else {
      req.user = data.id
      next ()
    }
  } catch (err) {
    next (err)
  }
}

async function authorize (req, res, next) {
  try {
    const targetId = +req.params.id
    let data = await Task.findByPk (targetId)
    if (data.UserId !== req.user) {
      res.status (401).json ({message: 'Unauthorized'})
    } else {
      next()
    }
  } catch (err) {
    next (err)
  }
}

module.exports = {
  authenticate,
  authorize
}