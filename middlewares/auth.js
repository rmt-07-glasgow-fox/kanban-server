//required models and tokenHelper
const { User, Task } = require('../models')
const { checkToken } = require('../helpers/jwt')

// authentication -> to see kanban/task, user must login first
function authentication(req, res, next) {
  try {
    //the token is stored in the header
    let decoded = checkToken(req.headers.access_token)

    //tempel userId dan email ke req.user
    req.user = {
      id:decoded.id,
      email:decoded.email
    }
    next()
  }
  catch(err) {
    next(err)
  }
}

// authorization -> to delete/update, user Id must be the same
function authorization(req, res, next) {
  //the userId is stored in token
  let taskId = +req.params.id //the targeted id that wants to be deleted
  try {
    Task.findByPk(taskId)
    .then((data) => {
      if (!data) {
        return res.status(404).json({message:"Error 404: task not found"})
      }
      else if (data.UserId === req.user.id) {
        next()
      }
      else {
        return res.status(401).json({message:"Unauthorized"})
      }
    })
  }
  catch(err) {
    next(err)
  }
}

module.exports = {
  authentication,
  authorization
}