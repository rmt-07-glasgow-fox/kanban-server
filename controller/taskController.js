const { Task } = require('../models')


class TaskController {
    static async listTask (req, res, next) {
        try {
            const data = await Task.findAll()

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async addTask (req, res, next) {
        let newTask = {
            title : req.body.title,
            category : req.body.category,
            description : req.body.description,
            // UserId : req.loginUser.id
            UserId : req.loginUser.id,
            CategoryId : req.body.CategoryId
        }

        try {
            const data = await Task.create(newTask)

            res.status(201).json({
                msg : 'data successfull create',
                id : data.id,
                title : data.title,
                CategoryId : data.CategoryId,
                UserId : data.UserId
            })
        } catch (err) {
            // console.log(err)
            next(err)
        }


    }

    static async moveTask(req, res, next) {
        let taskId = +req.params.id
        let moveCategory = {
                category : req.body.category
            }

        try {
            const data = await Task.update(moveCategory, { where : {
                id : taskId
            }})

            if(!data) {
                next( { name : 'notFound'})
            } else {
                res.status(201).json({
                    msg: `susscesfull moving task to ${moveCategory.category}`
                })
            }

        } catch (err) {
            next(err)
        }

    }

    static async deleteTask(req, res, next) {
        let id = +req.params.id

        try {
            const data = await Task.destroy({where :
                { id }
            })

            if(!data) {
                next({ name : 'notFound' })
            } else {
                res.status(200).json({
                    // id : data.id,
                    message : `Todo ${id} success to delete`
                })
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = TaskController