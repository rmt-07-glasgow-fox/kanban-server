const { Task } = require('../models')

module.exports = async (req, res, next) => {

    try {
        const taskId = req.params.id
        const userId = req.loggedInUser.id
        console.log('LLLLLLLLLLLLLLLLLLLLLLLL')
        const task = await Task.findOne({
            where: {
                id: taskId
            }
        })
        if(task.UserId == userId) {
            next()
        }
        else {
            throw {
                status: 401,
                message: 'You are not authorized'
            }
        }
    }
    catch (err) {
        next(err)
    }
}