const { verifyToken } = require('../helper/jwt')
const { User, Task } = require('../models')

async function authenticate (req, res, next) {
  try {
    console.log('authenticate')
    if (!req.headers.access_token) throw ({message: 'Please login first'});
    let payload = await verifyToken(req.headers.access_token)
    let user = await User.findOne({where: {email: payload.email}})
    if (user) {
      next()
    } else {
      throw ({name: '401'})
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

async function authorize (req, res, next) {
  try {
    console.log('authorize')
    let idParams = req.params.id
    let payload = await verifyToken(req.headers.access_token)
    let task = await Task.findOne({where: {id: idParams}})
    if (task) {
      if (task.UserId == payload.id) {
        next()
      } else {
        throw ({name: '401'})
      }
  } else {
    throw ({name: '404'})
  }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = { authenticate, authorize }