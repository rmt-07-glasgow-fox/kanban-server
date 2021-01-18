const { verifyToken } = require('../helpers/jwt')
const { User, Task } = require('../models/index')

async function authenticate(req, res, next){
  console.log('masuk proses authentikasi')
  try {
    let token = req.headers.access_token
    let userParams = verifyToken(token)
    console.log(userParams.email)
    let user = await User.findOne({
      where: {email: userParams.email}
    })
    req.user = user
    next()
  } catch (error) {
    console.log(error, 'ini didalem middleware authenticate')
    res.status(500).json({msg: 'internal server error'})
  }
}

async function authorize(req, res, next){
  console.log('masuk proses authorize')
  try {
    let task = null
    task = await Task.findOne({where: {
      id: req.params.id
    }})
    if(task && (task.user_id !== req.user.id)){
      return res.status(401).json({msg: 'not authorized'})
    } else if (!task){
      return res.status(404).json({msg: 'not found'})
    }
    next()
  } catch (error) {
    console.log(error, 'ini didalem middleware authorize')
    res.status(500).json({msg: 'internal server error'})
  }
}

module.exports = { authenticate, authorize }