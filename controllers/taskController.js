const { Task } = require('../models')

class TaskController{
    static async showTask(req, res){
        try {
            const result = await Task.findAll()

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async addTask(req, res){
        try {
            const opt = {
                title: req.body.title,
                category: req.body.category,
                userId: req.user.id,  
            }

            const result = await Task.create(opt)

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error)
        }
        
    }

    static async editTask(req, res){
        try {
            const id = +req.params.id

            const result = await Task.findOne({
                where: {
                    id
                }
            })

            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async updateTask(req, res){
        try {
            const id = +req.params.id
            const opt = {
                title: req.body.title,
                category: req.body.category
            }

            const updated = await Task.update(opt, {
                where: {
                    id
                },
                returning: true
            })

            res.status(200).json(updated)
        } catch (error) {
            res.status(500).json(err)
        }
    }

    static async moveCategory(req, res){
        try {
            const id = +req.params.id

            const opt = {
                category: req.body.category
            }

            const result = await Task.update(opt, {
                where: {
                    id
                },
                returning: true
            })

            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteTask(req, res){
        try {
            const id = +req.params.id 
            
            const result = await Task.destroy({
                where: {
                    id
                }
            })

            if(!result){
                return res.status(404).json({message: 'error not found'})
            }

            return res.status(200).json({message: 'task success to delete'})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = TaskController