const { cekToken } = require('../helpers/jwt')
const { User, Task } = require('../models')

const authenticate = async (req,res,next) => {
  try {
    const token = req.headers.access_token
    const decode = cekToken(token)
    const user = await User.findOne({
      where: {email : decode.email}
    })
    if(user){
      req.user = decode
      next()
    } else {
      next({name: 'ErrorAuthenticate'})
    }
  } catch (err) {
    next(err)
  }
}

const authorize = async (req,res,next) => {
  try {
    const { id } = req.params
    const UserId = req.user.id
    const task = await Task.findOne({
      where: {id}
    })
    if(task){
      if(UserId == task.UserId){
        next()
      }else{
        next({name: 'ErrorAuthorize'})
      }
    }else{
      next({name: 'ErrorNotFound'})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authenticate,
  authorize
}