const { Task } = require("../models")

async function authorize(req, res, next) {
    try {
        let task = await Task.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!task || task.UserId !== req.user.id) {
            next({
                message: "this is not yours",
                code: 401,
                from: 'function authorize'
            })
        } else {
            next()
        }
    } catch (err) {
        next({
            message: err.message,
            code: 500,
            from: 'function authorize'
        })
    }
}



module.exports = {
    authorize
}