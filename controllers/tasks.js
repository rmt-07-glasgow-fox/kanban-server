const { Task } = require('../models/index')

class ControllerTasks{
    
    static findAllTasks(req, res, next) {
        Task.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findTasks(req, res, next) {
        Task.findAll({
            where: {
                userId: +req.user.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static insert(req, res, next) {
        console.log(req.body);
        let obj = {
            name:req.body.name,
            categoryId: req.body.categoryId,
            userId: req.user.id
        }
        Task.create(obj)
        .then(data => res.status(201).json(data))
        .catch(err => {
            next(err)
            console.log(err);
        })
    }
    static findOne(req, res, next) {
        let id = req.params.id
        console.log(id);
        Task.findByPk(id)
        .then(data => {
            console.log(data);
            if(data !== null) {
                res.status(200).json(data)
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(() => {
            next(err)
        })
    }
    static update(req, res, next) {
        console.log('edit masuk');
        console.log(req.body.name);
        console.log(req.body.categoryId);
        let id = +req.params.id
        console.log(id);
        let obj = {
            name:req.body.name,
            categoryId:req.body.categoryId
        }
        Task.update(obj,{
            where: {
                id
            },
            returning: true
        })
        .then((data) => {
            // returning true (1) either false
            if(data[0]) {
                res.status(200).json(data[1])
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static patch(req, res, next) {
        let id = +req.params.id
        let obj = { categoryId:req.body.categoryId }
        Task.update(obj, {
            where: {
                id
            },
            returning: true
        })
        .then((data) => {
            // returning true (1) either false
            if(data[0]){
                res.status(200).json(data[1])
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static delete(req, res, next) {
        console.log('masuk ke controller');
        let id = +req.params.id
        let deleted = {
            name: 'Task success to delete'
        }
        Task.destroy({
            where: {
                id
            }
        })
        .then((data) => {
            if(data === 1) {
                res.status(200).json(deleted)
            } else {
                next({
                    name: "ResourceNotFound" 
                })
            }
        })
        .catch(() =>  {
            next(err)
        })
    }
}

module.exports = ControllerTasks