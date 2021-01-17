const { Category } = require('../models')

class CategoryController{
    static async showCategory(req, res){
        try {
            const result = await Category.findAll()

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = CategoryController