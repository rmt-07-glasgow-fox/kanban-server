const { Category } = require('../models')

class CategoryController {
    static async AddCategory(req, res, next) {
        try {
            let { category } = req.body
            if (!category) { return res.status(400).json({ message: 'Category is empty' }) }
            
            // let newCategory = await Category.create({ category })
            // let response = {
            //     category: newCategory.category 
            // }

            return res.status(200).json({ message: req.body })
        } catch (err) {
            next(err)
        }
    }

    static async ListCategory(req, res, next) {
        try {

            return res.status(200).json({ message: 'list' })
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = CategoryController