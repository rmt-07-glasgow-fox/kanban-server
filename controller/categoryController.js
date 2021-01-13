const { Category, Task } = require('../models')

class categoryControl {
    static async readData (req, res) {
        try {
            const read = await Category.findAll({
                include: [Task]
            })
            // const read = await Category.findAll()
            res.status(200).json(read)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async create (req, res) {
        const name = req.body.name
        try {
            const data = await Category.create({
                name
            })
            res.status(200).json({
                msg: `${name} succsesfully created`
            })
        } catch (err) {
            res.status(500).json({
                msg: 'Error in internal server'
            })
        }
    }
}

module.exports = categoryControl