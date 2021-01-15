const { Category } = require('../models')

class CategoryController {
    static create(req, res, next) {
      const { name } = req.body
      Category
          .create({ name })
          .then(data => {
              const { id, name } = data
              res.status(201).json({ id, name })
          })
          .catch(next)

    }

    static findAll(req, res, next) {
        Category
            .findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findByPk(req, res, next) {
        const id = +req.params.id
        Category
            .findByPk(id)
            .then(data => {
                data ? res.status(200).json(data) :
                next({ name: 'NotFoundError' })
            })
            .catch(next)
    }

    static update(req, res, next) {
        const id = +req.params.id
        const { name } = req.body
        Category
            .update({ name }, {
                where: { id },
                returning: true
            })
            .then(dataUpdated => {
                const { id, name, createdAt, updatedAt } = dataUpdated[1][0].dataValues
                res.status(200).json({ id, name, createdAt, updatedAt })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const id = +req.params.id
        Category
            .destroy({
                where: { id },
                returning: true
            })
            .then(data => {
                data ? 
                    res.status(200).json({ message: 'Success deleted!' }) :
                    next({name: 'NotFoundError'})
            })
            .catch(next)
    }
}

module.exports =CategoryController