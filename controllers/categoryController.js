const {Category,Task} = require('../models')
class CategoryController {

    static async list(req, res, next) {
        try{
            let data = await Category.findAll({
                attributes: ['id', 'name'],
			    include: {
                    model: Task,
                    attributes: ['id', 'title'],
			    },})
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = {CategoryController}