const { Category, Task } = require('../models')

class CategoryController {
    static async getCategoryList(req, res, next) {
        try {
            let categories = await Category.findAll({
                order: [['id', 'ASC']],
                include: [Task]
            })
            if (!categories) {
                next({name: "NotFound", message: "data not found"})
            } else {
                // console.log(categories);
                res.status(200).json(categories)
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CategoryController