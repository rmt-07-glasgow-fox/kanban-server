const { Category } = require('../models')

class Controller {
    static async getCategory(req, res, next) {
        try {
            const getCategory = await Category.findAll({
                order: [['id', 'ASC']],
            })
            res.status(200).json(getCategory)

        } catch (err) {
            console.log(err.stack)
            next(err)
        }
    }

    static async createCategory(req, res, next) {
        try {
            const { category } = req.body
            console.log(req.body, "INI BODY")
            const createCategory = await Category.create({
                name: category, UserId: req.user.id
            })
            res.status(200).json(createCategory)

        } catch (err) {
            next()
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const deleteCategory = await Category.destroy({
                where: {
                    name: req.params.item
                }
            })
            res.status(200).json({ message: "Category Deleted" })

        } catch (err) {
            console.log(err.stack)
            next(err)
        }
    }
}

module.exports = Controller