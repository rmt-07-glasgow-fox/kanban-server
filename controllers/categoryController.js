const { User, Task, Category } = require('../models/index')

class Controller {
    static showCategory(req, res, next)  {
        Category.findAll({
            include: [Task],
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next()
        })
    }

    static addCategory(req, res, next)  {
        let newData = {
            category: req.body.category
        }
        Category.create(newData)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next()
        })
    }

    static updateCategory(req, res, next)  {
        let condition  = {
            where: {
                id: +req.params.CategoryId
            }
        }
        let newData = {
            category: req.body.category
        }
        Category.update(newData, condition)
        .then(data => {
            return Category.findByPk(+req.params.id)
        })
        .then(data  => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteCategory(req, res, next)  {
        let condition = {
            where: {
                id: +req.params.CategoryId
            }
        }
        Category.destroy(condition)
        .then(data  => {
            res.status(200).json({message: 'success'})
        })
        .catch(err => {
            rnext()        
        })
    }    
}

module.exports = Controller