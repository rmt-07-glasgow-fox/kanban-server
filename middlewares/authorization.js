const { Task } = require('../models')

module.exports = (req,res,next) => {
        Task.findOne({where: {id: req.params.id}})
        .then(data => {
            if(data){
                if (data.UserId == req.loggedInUser.id){
                    next()
                } else {
                    throw {
                        status: 401,
                        message: "you are not authorize with this Task"
                    }
                }
            } else {
                throw {
                    status: 404,
                    message: "Task not found"
                }
            }
        })
        .catch(error => {
            next(error)
        })
}