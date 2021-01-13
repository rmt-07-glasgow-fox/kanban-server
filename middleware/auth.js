const { User, Task } = require('../models')
const { checkToken } = require('../helper/jwt')

function authenticate(req, res, next) {
      let { access_token } = req.headers
      let decoded = checkToken(access_token)

      User.findOne({where: {email: decoded.email}})
          .then(user => {
                if(!user) res.status(400).json(err)
                req.user = user
                next()
          }).catch(err => {
              req.status(500).json(err)
          })
}

function authorize(req, res, next){
    let { id } = req.params

    Task.findOne({where: {id}})
        .then(task => {
            if(task.UserId !== req.user.id) req.status(401).json(err)
            next() 
        }).catch(err => {
            res.status(500).json
        })

}

module.exports = { authenticate, authorize }