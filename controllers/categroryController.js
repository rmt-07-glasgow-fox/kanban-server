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
                res.status(500).json({message: "Internal Server Error"})
            })
    }

    static getCategoryHandler(req, res, next) {

        Category.findAll({include: Task})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({message: "Internal Server Error"})
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
                res.status(500).json(err)
            })
    }

    static deleteCategoryHandler(req, res, next) {
        let id = req.params.id

        Category.destroy({where: {
            id
        }})
            .then(data => {
                res.status(200).json()
            })
            .catch(err => {
                res.status(500).json({message: "Internal Server Error"})
            })
    }
}

module.exports = CategoryController