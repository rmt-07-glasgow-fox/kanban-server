const { readToken } = require('../helpers/token')
const { User, Task, Category } = require('../models')

async function authenticate(req, res, next) {
    try {
        let { access_token } = req.headers
        if (!access_token) { return res.status(401).json({ messsage: "access_token is required" }) }

        let decodedToken = readToken(access_token)
        let user = await User.findByPk(decodedToken.id)

        if (!user) {
            return next({ name: '401' })
        }

        if (user) {
            // create req.user => access in controllers
            req.user = decodedToken

            console.log('authentic')
            return next()
        }

        console.log('authenticate salah nih')

    } catch (err) {
        return next(err)
    }
}

async function authorizeTask(req, res, next) {
    try {
        let idTask = +req.params.idTask
        if (!idTask) {
            return res.status(400).json({ messsage: 'idTask params is required' })
        }

        let task = await Task.findByPk(idTask)

        if (!task) {
            return next({ name: '404' })
        }

        if (task) {
            if (task.UserId !== req.user.id) {
                return next({ name: '401' })
            }

            if (task.UserId === req.user.id) {
                console.log('>>> authorized Task')
                req.task = task
                return next()
            }
        }

        console.log('authorize salah nih')
    } catch (err) {
        return next(err)
    }
}

async function authorizeCategory(req, res, next) {
    try {
        let idCategory = +req.params.CategoryId
        if (!idCategory) {
            return res.status(400).json({ messsage: 'CategoryId params is required' })
        }

        let category = await Category.findByPk(idCategory)

        if (!category) {
            return next({ name: '404' })
        }

        if (category) {
            console.log('>>> authorized Category')
            return next()
        }

        console.log('authorize salah nih')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    authenticate, authorizeTask, authorizeCategory
}