const { Task } = require('../models')

class TaskController{
    static async showAllTask(req, res, next){
        try {
            const task = await Task.findAll()
            // console.log(loggedInUser)
            res.status(200).json(task)
        } catch (error) {
            next(error)
        }
        
    }
    static async createTask(req, res, next){
        const payload = {
            title: req.body.title,
            CategoryId: req.body.CategoryId,
            UserId: req.loggedInUser.id 
        }
        try {
            const newTask = await Task.create(payload)
            res.status(201).json(newTask)
        } catch (error) {
            next(error)
        }
    }
    static async getTaskId(req, res, next){
        try {
            const task = await Task.findByPk(req.params.id)
            console.log(task)
            if(!task){
                throw {
                    msg: "TaskNotFound",
                }
            }
            else{
                res.status(200).json(task)
            }
        } catch (error) {
            next(error)
            
        }
    }
    static async editCategory(req, res, next){
        try {
            console.log(req.body.CategoryId, "<<< Controller")
            const updateCategory = await Task.update({CategoryId: req.body.CategoryId}, {where: {id: req.params.id}, returning: true})
            if(updateCategory){
                res.status(200).json(updateCategory[1][0])
            }
            else{
                throw {
                    msg: "TaskNotFound"
                }
            }
        } catch (error) {
            console.log(error)

            next(error)
        }
    }
    static async editTask(req, res, next){
        const payload = {
            title: req.body.title,
            category: req.body.category,
        }
        try {
            const dataTask = await Task.update(payload, {where: {id: req.params.id}, returning: true})
            res.status(200).json(dataTask[1][0])
        } catch (error) {

            next(error)
        }
    }
    static async deleteTask(req, res, next){
        let title = ''
        try {
            const task = await Task.findByPk(req.params.id)
            title += task.title
            const dataTask = await Task.destroy({where: {id: +req.params.id}});
            console.log(dataTask)
            res.status(200).json(`Task ${title} succes to delete`);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TaskController;