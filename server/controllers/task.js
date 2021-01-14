const { Task, UserTask, User } = require('../models')

class Controller {
    static async createTask(req, res, next){
        try {
            const {title, description, dueDate, status} = req.body
            const addedTask = await Task.create({
                title, description, dueDate, status 
            })
            const temp = await UserTask.create({
                UserId: req.user.id,
                TaskId:addedTask.id,
                dueDate: dueDate
            })
            res.status(200).json(addedTask)
        } catch (err){
            next(err)
        }
    }

    static async readTask(req, res, next){
        try {
            const readTask = await UserTask.findAll({
                include: [User, Task],
                where: {
                    UserId: req.user.id
                }
            })
            console.log(readTask[0].Task.title, "YEAH")
            res.status(200).json(readTask)

        } catch (err) {
            console.log(err.stack)
            next(err)
        }
    }

    static async putTask(req, res, next){
        try {
            console.log("MASUK PUT")
            const {title, description, dueDate, status} = req.body
            const putTask = await User.update({
                title, description, dueDate, status},
            {
                where: {
                    id: +req.params.id
                }
            })
            if(!putTask){
                next({name: "ResourceNotFound"})
            } else {
                res.status(200).json({message: "Task Updated"})
            }
        } catch (err) {
            next(err)
        }
    }


    static async patchTask(req, res, next){
        try {
            console.log("MASUK PATCH")
            const {status} = req.body
            const patchTask = await User.update({status}, 
            {
                where: {
                    id: +req.params.id
                }
            })
            if(!patchTask){
                next({name: "ResourceNotFound"})
            } else {
                res.status(200).json({message: "Task Updated"})
            }
        } catch (err) {
            next(err)
        }
    }

    static async deleteTask(req, res, next){
        try {
            console.log("MASUK DELETE")
            const deletedConjunction = await UserTask.destroy({
                where: {
                    id: +req.params.id
                }
            })
            if(!deletedConjunction){
                next({name: "ResourceNotFound"})
            }
            const deletedTask = await Task.destroy({
                where: {
                    id: +req.params.id
                }
            })
            if(!deletedTask){
                next({name: "ResourceNotFound"})
            } else {
                res.status(200).json({message: "Task Deleted"})
            }
        } catch (err) {
            next(err)
        }
    }

    static async addMembers(req, res, next){
        try {
            const {email} = req.body
            const findMembers = await User.findOne({
                where: {
                    email
                }                
            })
            if(!findMembers){
                next({name:"FindUserError"})
            }
            const addedMembers = await UserTask.create({
                TaskId:+req.params.id,
                UserId:+findMembers.id 
            })
            
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller