const { Task } = require('../models')

async function authorization(req, res, next){
    try {
        const task = await Task.findOne({where: {id: req.params.id}})
        console.log(task)
        // console.log(req.loggedInUser)   
        if(task){
            if(task.UserId === req.loggedInUser.id){
                console.log(req.body)
                next()
            }
            else{
                throw {status: 401, name: "noAuthorized"}
            }
        }
        else{
            throw {
                status: 404,
                name: "idNotFound"
            }
        }
    } catch (error) {
        next(error)
    }
}
module.exports = authorization
