const { Task } = require('../models')

module.exports = async (req, res, next) => {
    const id = req.params.id
    
    try {
        const task = await Task.findOne({
            where: {
                id
            }
        })

        if (!task) {
            throw {
                status: 404,
                message: `Error Not Found`
            }
        } else if (task.UserId == req.loggedIn.id) {
            next()
        } else {
            throw {
                status: 401,
                message: `You're Not Authorized To Edit This`
            }
        }
    } catch (error) {
        next(error)
    }
}