const {Task,Category} = require('../models')
class TaskController {
    static async getAllTask (req , res, next ) {
        try {
            const task = await Task.findAll({order:[['id','ASC']]})
            res.status(200).json(task)
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
        const {title, CategoryId} = req.body;
        try {
            await Task.update({title: title, CategoryId: CategoryId}, {where: {id: id}})
            res.status(200).json({message: 'task has been update'})
        } catch (err) {
            console.log(err)
            // next(err)
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