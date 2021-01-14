const {cekToken} = require('../helpers/jwt')
const { User,Task } = require('../models') 

function authenticate (req,res,next) {
    try{
     let decoded = cekToken(req.headers.access_token)
     // console.log(decoded)
     User.findOne({ where : { email: decoded.email}})
     .then (find => {
         if(!find) {
             return next ({name : 'Auth'})
         } else {
            //  req.user = find
             req.user = {id: find.id}
             next()
         }
     })
     .catch(err => {
         next ({code: 500})
     })
    } catch(err) {
        next(err)
    }
 }

function authorize (req, res, next) {
    Task.findOne({where : { id: req.params.id}})
    .then(data => {
        if(data.UserId === req.user.id) {
            next()
        }
        else {
            next({name: 'Authorize'})
        }
    })
    .catch(err => {
        next(err)
    })
}
 module.exports = {authenticate,authorize}