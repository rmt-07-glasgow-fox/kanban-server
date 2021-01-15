const { checkToken } = require('../helpers/jwt')
const { User, Task } = require('../models')


async function authentication(req, res, next) {
    if (!req.headers.access_token) {
        res.status(401).json({message: "No Token"})
      }
    try {
        let decoded = checkToken(req.headers.access_token)
        // console.log(decoded)
        let data = await User.findOne({ 
            where: {
            email: decoded.email
        }})
            // console.log(data)
                if(!data) {
                    next({name: "invalid"})
                }
                else {
                    req.user = data
                }
                next()
    }
    catch(err) {
        console.log(err)
    }
}

function authorization(req, res, next) {

    Task.findOne({where: {
        id: req.params.id
    }})
        .then(data => {
            // console.log(data)
            // console.log(req.user.id)
            if(!data) {
                next({name:"NotAuthorized"})
            } else if (data.UserId === req.user.id){
                next()
            } 
        })
        .catch(err => {
            next(err)
        })
    

}

module.exports = {
    authentication,
    authorization
}