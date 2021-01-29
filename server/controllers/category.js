const { Task, Category, User} = require('../models')

class CategoryController{
    static async showAll(req, res, next){
        try {
            // console.log(req.loggedInUser)
            const category = await Category.findAll({include: {model: Task, include:{model: User}} })
            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    } 
    static async createCategory(req, res, next){
        const payload = req.body.category
        try{
            const category = await Category.create(payload)
            res.status(201).json(category)
        }
        catch(error){
            next(error)
        }
    }

}


module.exports = CategoryController