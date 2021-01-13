const { User, Task } = require('../models')
const { verifyToken } = require('../helpers/jwtHelper')
const task = require('../models/task')

const authentication = (req, res, next) => {
  try {
    if(req.headers.access_token){
      let decryptedData = verifyToken(req.headers.access_token)
      User.findOne({
        where:{
          email: decryptedData.email
        }
      })
        .then(data => {
          req.userData = data
          next()
        })
        .catch(err => {
          next({
            name: 'WrongEmail'
          })
        })
    }else{
      next({
        name: 'Forbidden'
      })
    }
  } catch (error) {
    next({
      name: 'InvalidToken'
    })
  }
}

const authorization = (req, res, next) => {
  const { id } = req.params
  try {
    Task.findOne({
      where:{
        id
      }
    })
      .then(data => {
        if(!data || data.UserId !== req.userData.id){
          next({
            name: 'Forbidden'
          })
        }else{
          next()
        }
      })
      .catch(err => {
        next(err)
      })
  } catch (error) {
    next({
      name: 'InvalidToken'
    })
  }
}

module.exports = {
  authentication,
  authorization
}