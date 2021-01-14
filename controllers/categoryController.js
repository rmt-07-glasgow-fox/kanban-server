const {Category} = require('../models')
class CategoryController {
    static async create (req, res, next) {
        const {name} = req.body
        try {
            const data = await Category.create({name:name})
            return res.status(201).json(data)
        } catch (err) {
            next (err)
        }
    }

    static async deleteCategory (req, res, next) {
        const id = Number(req.params.id)
        try {
            await Category.destroy({where:{id:id}})
            res.status(200).json({message: 'Category has been delete'})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = {CategoryController}