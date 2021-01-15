const {Task} = require('../models/index')

class Controller {
    static create(req, res, next){
        let obj = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            userId: req.user.id
        }

        Task.create(obj)
        .then(data =>{
            return res.status(201).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }

    static showTask(req, res, next){
        Task.findAll()
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }

    static showById(req, res, next){
        let id = req.params.id
        Task.findByPk(id)
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }

    static update(req, res, next){
        let id = req.params.id
        let obj = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        }
        Task.update(obj,{where: {id}, returning: true, plain: true})
        .then(data =>{
            return res.status(200).json(data[1])
        })
        .catch(err =>{
            next(err)
        })
    }

    static patch(req, res, next){
        let id = req.params.id
        let obj = {
            category: req.body.category
        }
        Task.update(obj, {where: {id}, returning: true, plain: true})
        .then(data =>{
            return res.status(200).json(data[1])
        })
        .catch(err =>{
            next(err)
        })
    }

    static destroy(req, res, next){
        let id = req.params.id
        Task.destroy({where: {id}})
        .then(data =>{
            return res.status(200).json({msg: `task success to delete`})
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller