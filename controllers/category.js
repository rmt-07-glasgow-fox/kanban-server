const { Category, Task } = require('../models/index')

class ControllerCategory{
    
    static findAllCategory(req, res, next) {
        Category.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static findCategory(req, res, next) {
        Category.findAll({
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
            name:req.body.name
        }
        Category.create(obj)
        .then(data => res.status(201).json(data))
        .catch(err => {
            next(err)
        })
    }
    static findOne(req, res, next) {
        let id = req.params.id
        console.log(id);
        Category.findByPk(id)
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
        let id = +req.params.id
        let obj = {
            name:req.body.name
        }
        Category.update(obj,{
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
        let obj = { name:req.body.name }
        Category.update(obj, {
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
        let id = +req.params.id
        let deleted = {
            name: 'Category success to delete'
        }
        Category.destroy({
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

module.exports = ControllerCategory