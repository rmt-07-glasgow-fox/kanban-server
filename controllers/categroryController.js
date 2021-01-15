const { Category, Task } = require('../models')

class CategoryController {

    static postCategoryHandler(req, res, next) {

        const { name } = req.body

        Category.create({
            name
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getCategoryHandler(req, res, next) {

        Category.findAll({include: Task})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static putCategoryHandler(req, res, next) {
        let id = req.params.id
        let { name } = req.body

        Category.update({
            name
        },{
            where: {
                id
            }, returning: true
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteCategoryHandler(req, res, next) {
        let id = req.params.id

        Category.destroy({
            where: {
                id
            }
        })
            .then(data => {
                    return Task.destroy({where: {
                        CategoryId: id
                    }})
                
            })
            .then(data2 => {
                res.status(200).json({message: "Delete Category success"})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CategoryController