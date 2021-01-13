const { Task, Category } = require('../models')

class taskControl {
    static async readAll (req, res) {
        try {
            const readAll = await Task.findAll({ order: [['date', 'ASC']] })
            res.status(200).json(readAll)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
    static async create (req, res) {
        const { title, CategoryId } = req.body
        const date = new Date()
        const UserId = req.user.id

        try {
            const create = await Task.create({
                title,
                CategoryId,
                date,
                UserId
            })
            res.status(201).json({
                title,
                CategoryId,
                date,
                UserId
            })
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async update (req, res) {
        // console.log(req.user);
        try {
            let id = req.params.id
            const input = {
                title: req.body.title,
                date: new Date()
            }
            const search = await Task.findByPk(id)
            if (!search) {
                res.status(404).json({
                    msg: 'Data is undefind'
                })
            } else {
                const update = await Task.update(input,
                { where: { id }
                })
                res.status(200).json({
                    title: search.title,
                    date: search.date
                })
            }
        } catch (err) {
            res.status(500).json(err)
            // console.log(err)
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