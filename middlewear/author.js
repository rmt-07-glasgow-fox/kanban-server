
const {Task} = require('../models')

module.exports = async (req, res, next) => {
    try {
        let id = req.params.id
        let user = req.user
        const findTask = await Task.findByPk(id)
        if(findTask.UserId == user.id) {
            next ()
        } else {
            throw {
                status: 401,
                message: 'Unauthorized'
            }
        }
    } catch (err) {
        next(err)
    }
}