const { tokenCheck } = require("../helpers/jwt")
const { User, Task, UserTask } = require("../models")


async function authenticate(req, res, next) {
    try {
        const decoded = tokenCheck(req.headers.access_token)
        const checkUser = await User.findOne({
            where: {
                email: decoded.email
            }
        })
        if (!checkUser) {
            next({ name: "SignInError" })
        } else {
            req.user = checkUser
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function authorize(req, res, next) {
    try {
        const checkUser = await UserTask.findAll({
            where: {
                TaskId: +req.params.id
            }
        })
        if (!checkUser || +checkUser[0].UserId !== +req.user.id) {
            next({ name: "AccessError" })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { authenticate, authorize }