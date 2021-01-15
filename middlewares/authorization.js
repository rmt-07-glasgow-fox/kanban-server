const { Task } = require('../models/index')

async function authorization(req,res,next){
    try {
        const { id } = req.params
        let result = await Task.findByPk(id)
        if(!result){
            throw { msg: 'Task Not Found', status: 404 }
        }else if (result.UserId == req.loggedInUser.id){
            next()
        }else{
            throw { msg: 'Not Authorize', status: 401 }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authorization