const { Category } = require('../models')
const category = require('../models/category')

class CategoryController {
    static async AddCategory(req, res, next) {
        try {
            let { category } = req.body
            if (!category) { return res.status(400).json({ message: 'Category is empty' }) }

            let newCategory = await Category.create({ category })
            let response = newCategory.category

            return res.status(200).json({ message: `Category ${response} is created` })
        } catch (err) {
            next(err)
        }
    }

    static async ListCategory(req, res, next) {
        try {
            let data = await Category.findAll({
                order: [['id']],
                attributes: ['id', 'category']
            })
            // console.log(data)

            return res.status(200).json(data)
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = CategoryController