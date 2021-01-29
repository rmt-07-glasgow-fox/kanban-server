const TaskController = require('./task')
const UserController = require('./user')

class MainController {
    static home(req, res, next) {
        const homepage = {
            message: `Kanban Server`
        }
        res.status(200).json(homepage)
    }
}

module.exports = { TaskController, UserController, MainController }