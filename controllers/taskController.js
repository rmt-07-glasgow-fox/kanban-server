const {Task,Category} = require('../models')
class TaskController {
    static async list (req, res, next) {
        const idCategory = Number(req.params.categoryId);
        try{
            const category = await Category.findOne({where:{id:idCategory}})
            if(!category) return next({name:'NotFound', attr:'Category'})
            const task = await Task.findAll({where:{CategoryId: idCategory}})
            return res.status(200).json(task)            
        } catch (err) {
            next(err)
        }
    }

    static async create (req, res, next) {
        const userId = Number(req.user.id);
        const {title, CategoryId} = req.body;
        try {
            const data = {title : title, UserId: userId, CategoryId: CategoryId}
            const task = await Task.create(data)
            return res.status(201).json(task)
        } catch (err) {
            next(err)
        }
    }

    static async update (req, res, next) {
        const id = Number(req.params.id);
        const {title} = req.body;
        try {
            await Task.update({title: title}, {where: {id: id}})
            res.status(200).json({message: 'task has been update'})
        } catch (err) {
            console.log(err)
            // next(err)
        }
    }

    static async changeCategory (req, res, next) {
        const id = Number(req.params.id);
        const idCategory = Number(req.params.categoryId);
        try {
            await Task.update({CategoryId: idCategory}, {where: {id: id}})
            return res.status(200).json({message: 'task has been update'})
        } catch (err) {
            next (err)
        }
    }

    static async deleteTask (req, res, next) {
        const id = Number(req.params.id);
        try {
            await Task.destroy({where: {id: id}})
            return res.status(200).json({message: 'task has been deleted'})
        } catch (err) {
            next (err)
        }
    }
}

module.exports = {TaskController}