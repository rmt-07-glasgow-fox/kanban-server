const { Task } = require('../models')

class taskControl {
    static async readAll (req, res) {
        try {
            const readAll = await Task.findAll()
            res.status(200).json(readAll)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async create (req, res) {
        const { title, category } = req.body
        const date = new Date()
        const UserId = req.body.UserId
        // console.log(UserId);
        try {
            const create = await Task.create({
                title,
                category,
                date
            })
            res.status(201).json({
                title,
                category,
                date
            })
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async update (req, res) {
        const { title, category } = req.body
        const date = new Date()
        let id = req.params.id
        try {
            const search = await Task.findByPk(id)
            if (search) {
                const update = await Task.update({title, category, date},
                { where: { id }
                })
                res.status(200).json({
                    // id,
                    title,
                    category,
                    UserId: search.UserId,
                    date
                })
            } else {
                res.status(400).json({
                    msg: 'Data is undefind'
                })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async delete (req, res) {
        let id = req.params.id
        try {
            const search = await Task.findByPk(id)
            if (search) {
                const del = await Task.destroy({
                    where: { id }
                })
                res.status(200).json({
                    msg: 'Delete taks success'
                })
            } else {
                res.status(400).json({
                    msg: 'Data is undefind'
                })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = taskControl