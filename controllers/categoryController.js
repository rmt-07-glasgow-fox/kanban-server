const { Category } = require('../models');

class Controller {
    static async addCategory(req, res, next) {
        try {
            const { name } = req.body;
            const category = await Category.create({ name });
            const output = {
                id: category.id,
                name: category.name
            }
            res.status(201).json(output);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = Controller;