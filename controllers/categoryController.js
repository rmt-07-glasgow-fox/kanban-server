const {Category,Task,User} = require('../models')
class CategoryController {

    static async list(req, res, next) {
        try{
            let data = await Category.findAll({
                attributes: ['id', 'name'],
			    include: {
                    model: Task,
                    attributes: ['id', 'title'],
                    order:[['id','ASC']],
                    include: {
                        model: User,
                        attributes: ['email'],
                    },    
			    },order:[['id','ASC']]})
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = {CategoryController}