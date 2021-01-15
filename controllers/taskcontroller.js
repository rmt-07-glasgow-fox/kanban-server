const { User, Task } = require('../models/index')


class TaskController {
    static async addTask(req,res,next){
        try {
            const input = {
                title: req.body.title,
                description: req.body.description,
                category: "backlog",
                UserId: req.loggedInUser.id
            }

            let result = await Task.create(input)
            
            res.status(201).json(`Success creating new task`)

        } catch (err) {
            next(err)            
        }
    }
    static async showTasks(req,res,next){
        try {
            let result = await Task.findAll({
                include: User
            })
            res.status(200).json(result)
            next()
        } catch (err) {
            next(err)
        }
    }
    static async editTask(req,res,next){
        try {
            let input = {
                title : req.body.title,
                description: req.body.description,
                category: req.body.category,
            }
            let result = await Task.update(input,{
                where:{
                    id:req.params.id
                },
                returning: true
            })
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async updateTask(req,res,next){
        try {
            let input = {
                category: req.body.category
            }
            let result = await Task.update(input,{
                where:{
                    id:req.params.id
                },returning:true
            })
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
    static async deleteTask(req,res,next){
        try {
            await Task.destroy({
                where:{
                    id:req.params.id
                }
            })
            let message = 'Task Deleted Successfully'
            res.status(201).json(message)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TaskController