const { tokenCheck } = require("../helpers/jwt")
const { User, Task, UserTask } = require("../models")


async function authenticate(req, res, next){
    try{
        const decoded = tokenCheck(req.headers.access_token)
        const checkUser = await User.findOne({
            where: {
                email:decoded.email
            }
        })
        if(!checkUser){
            next({name: "SignInError"})
        } else {
            req.user = checkUser
            next()
        }
    } catch(err){
        next(err)
    }
}

async function authorize(req, res, next){
    
    try {
        console.log("MASUK AUTHORIZE")
        console.log(req.params.id)
        const checkUser = await UserTask.findOne({
            where: {
                TaskId: +req.params.id
            }
        })
        console.log(checkUser.TaskId)
        console.log(+req.params.id)
        if(!checkUser || +checkUser.TaskId !== +req.params.id){
            next({name: "AccessError"})
        } else {
            next()
        }
    } catch(err) {
        console.log("MASUK ERR")
        next(err)
    }
}

module.exports = {authenticate, authorize}