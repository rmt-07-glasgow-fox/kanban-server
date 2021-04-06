const { checkToken } = require('../helper/jwt')
const { User, Category, Task } = require('../models/index')

function authenticate(req, res, next)  {
    try {
        let decoded = checkToken(req.headers.access_token)
        User.findOne({
            where : {
                email: decoded.email 
            }
        })
        .then(userLogin => {
            if (!userLogin) {
                next({
                    name: "please login first" 
                })
            } else {
                req.user = {
                    id: +userLogin.id
                }
                next()
            }
        })
        .catch(err => {
            next(err.message)
        })
        
    } catch (err) {
        next({
            name: "please login first" 
        })
        
    }
}

function authorize(req, res, next) {
    console.log('masuk ke auth');
    Task.findOne({
        where : {
            id: +req.params.id
        }
    })
    .then(data => {
        if (!data) {
            next({
                name: "ResourceNotFound" 
            })
        } else {
            if (data.userId === +req.user.id) {
                next()
            } else {
                console.log('unauthorize');
                next({
                    name: "unauthorize" 
                })
            }
        }
    })
    .catch(err => {
        next(err)
    })
}

function authorizeCategory(req, res, next) {
    console.log('masuk ke auth');
    Category.findOne({
        where : {
            id: +req.params.id
        }
    })
    .then(data => {
        if (!data) {
            next({
                name: "ResourceNotFound" 
            })
        } else {
            if (data.userId === +req.user.id) {
                next()
            } else {
                next({
                    name: "unauthorize" 
                })
            }
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = { 
    authenticate,
    authorize
}