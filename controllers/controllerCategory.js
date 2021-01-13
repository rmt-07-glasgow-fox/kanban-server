const { Category } = require('../models')

module.exports = class CategoryController {
    static getCategories(req, res, next) {
        Category.findAll({
            attributes: {
                exclude: [ 'createdAt', 'updatedAt' ]
            }
        })
        .then( data => {
            return res.status(200).json(data)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static createCategory(req, res, next) {
        const newData = {
            tag: req.body.tag
        }
        Category.create(newData)
        .then( data => {
            return res.status(201).json(data)
        } )
        .catch( err => {
            next(err)
        } )
    }

    static deleteCategory(req, res, next) {
        const getId = +req.params.id
        Category.destroy( {
            where: {
                id: getId
            }
        } )
        .then( data => {
            if (data === 1) {
                return res.status(200).json({ message: 'Category has been deleted' })
            } else {
                next({ name: 'notFound' })
            }
        } )
        .catch( err => {
            next(err)
        } )
    }
}