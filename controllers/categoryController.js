const { Category } = require('../models/index');

class CategoryController {
    static async postCategory (req, res, next) {
        try {
            let data = {
                name: req.body.name,
                orgId: req.params.orgId
            };

            data = await Category.create(data);

            data = {
                id: data.id,
                name: data.name,
                orgId: data.orgId
            };

            res.status(201).json(data);
        } catch (err) {
            if (err.errors) {
                return next({ code: 400, errors: err.erros });
            }
            
            next({ code: 500 });
        }
    }

    static async getCategory (req, res, next) {
        try {
            let data = await Category.findAll({ where: { orgId: req.params.orgId } });

            res.status(200).json(data);
        } catch (err) {
            next({ code: 500 });
        }
    }

    static async putCategory (req, res, next) {
        try {
            let data = {
                name: req.body.name
            };

            data = await Category.update(data, { where: { id: req.params.catId } });

            data = await Category.findOne({ where: { id: req.params.catId } });

            res.status(200).json(data);
        } catch (err) {
            if (err.errors) {
                return next({ code: 400, errors: err.erros });
            }

            next({ code: 500 });
        }
    }
    
    static async deleteCategory (req, res, next) {
        try {
            await Category.destroy({ where: { id: req.params.catId } });

            res.status(200).json({ msg: "Category delete success" });
        } catch (err) {
            next({ code: 500 });
        }
    }
}

module.exports = CategoryController;