const { User, Task } = require('../models')
const { checkToken } = require('../helper/jwt')

function authenticate(req, res, next) {
      let { access_token } = req.headers
      let decoded = checkToken(access_token)

      User.findOne({where: {email: decoded.email}})
          .then(user => {
                if(!user) res.status(400).json({message: 'you must be loggedin'})
                req.user = user
                next()
          }).catch(err => {
              req.status(500).json({message: 'broken inside'})
          })
}

function authorize(req, res, next){
    let { id } = req.params

    Task.findOne({where: {id}})
        .then(task => {
            if(task.UserId !== req.user.id) next({name: 'Unauthorized'})
            next() 
        }).catch(err => {
            next(err)
        })

}

module.exports = { authenticate, authorize }