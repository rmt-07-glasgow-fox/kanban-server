const { checkToken } = require('../helpers/jwt')
const { User, Task } = require('../models')

async function authenticate(req, res, next) {
    try {
        let decoded = checkToken(req.headers.access_token)
        let find = await User.findOne({where: {email: decoded.email}})

        if (find) {
            req.user = {
                id: find.id,
                email: find.email
            }
            next()
        } else {
            next({name: 'NotLogin', message: 'please login first'})
        }
    } catch (err) {
        next(err)
    }
}

async function authorize(req, res, next) {
    try {
        let find = await Task.findOne({where: {id: req.params.id}})
        console.log(find);
        if (!find) {
            return next({name: 'NotFound', message: 'data not found'})
        }
        if (find.UserId === req.user.id) {
            console.log('author');
            next()
        } else {
            next({name: 'Forbidden', message: 'not your own'})
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    authenticate,
    authorize
}