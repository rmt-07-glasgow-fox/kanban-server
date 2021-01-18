const {Task, User} = require('../models')

class Controller{

/*=============================== ADD TASK =============================*/  
    static addTask(req, res, next){
        let body = req.body
        let UserId = req.user.id
        let dataTask = {
            title: body.title,
            category: body.category,
            description: body.description,
            UserId
        }

        Task.create(dataTask)
        .then(data=>{
            res.status(201).json({message: data})
        })
        .catch(err=>{
            next(err)
        })
    }

/*=============================== ALL LIST TASK =============================*/  
    static listAllTask(req, res, next){
        Task.findAll({include:User})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

/*=============================== GET TASK BY ID =============================*/ 
    static getTaskById(req, res, next){
        let id = req.params.id
        
        Task.findByPk(id)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })

    }

/*=============================== UPDATE TASK =============================*/ 
    static updateTask(req, res, next){
        let body = req.body
        let id = req.params.id
        let UserId = req.user.id
        let dataTask = {
            title: body.title,
            category: body.category,
            description: body.description,
            UserId
        }
        Task.update(dataTask, {where:{id}})
        .then(data=>{
            res.status(200).json({
                message: 'Data Updated',
                title: dataTask.title,
                category: dataTask.category,
                description: dataTask.description
            })
        })
        .catch(err=>{
            next(err)
        })
    }

/*=============================== UPDATE CATEGORY =============================*/ 
    static updateCategory(req, res, next){
        let id = req.params.id
        let category = {
            category: req.body.category
        }

        Task.update(category, {where:{id}})
        .then(data=>{
            res.status(200).json({message: `category updated to ${category.category}` })
        })
        .catch(err=>{
            next(err)
        })
    }

/*=============================== DELETE TASK =============================*/ 
    static deleteTask(req, res, next){
        let id = req.params.id
        Task.destroy({where:{id}})
        .then(data=>{
            res.status(200).json({message: `Task with ID ${id} has been delete`})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Controller