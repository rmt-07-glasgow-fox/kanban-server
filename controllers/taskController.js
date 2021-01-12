const { User, Task, Category } = require('../models');

class Controller {
    static async showAll(req, res, next) {
        // res.send(req.headers.user)
        try {
            const users = await Category.findAll({ include: [Task]});
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async add(req, res, next) {
        try {
            const { id } = req.headers.user;
            const category = req.query.name;
            const { title, description } = req.body;
            const findCategory = await Category.findOne({ where: { name: category } });
            const input = {
                UserId: id,
                CategoryId: findCategory.id,
                title,
                description
            }
            const task = await Task.create(input);
            const output = {
                id: task.id,
                title: task.title,
                description: task.description
            };
            res.status(201).json(output);
        } catch (err) {
            res.status(500).err;
        }
    }

    static async editTask(req, res, next) {
        try {
            const id = +req.params.id;
            const category = req.query.name;
            const input = {
                title: req.body.title,
                description: req.body.description
            }
            const findCategory = await Category.findOne({ where : { name: category } });
            const find = await Task.update(input, {
                where: {
                    id,
                    UserId: req.headers.user.id,
                    CategoryId: findCategory.id
                },
                returning: true
            })
            if (find[0] !== 0) {

                res.send(find[1]);
            } else {
                throw { name: "Id Not Found"};
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async editCategory(req, res, next) {
        try {
            const category = req.query.name;
            const id = +req.params.id;
            const userId = req.headers.user.id;
            const newCategory = await Category.findOne({ where: { name: req.body.name} });
            const findCategory = await Category.findOne({ where: { name: category } });
            if (newCategory && findCategory) {
                const task = await Task.update({ CategoryId: newCategory.id }, {
                    where: {
                        id,
                        UserId: userId,
                        CategoryId: findCategory.id
                    },
                    returning: true
                })
                res.status(200).json(task[1]);
            } else {
                throw { name: "Category not Found"};
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const userId = req.headers.user.id;
            const category = req.query.name;
            const id = req.params.id;
            const findCategory = await Category.findOne({ where: { name: category } });
            const destroy = await Task.destroy({
                where: {
                    id,
                    UserId: userId,
                    CategoryId: findCategory.id
                }
            });
            if (destroy !== 0) {
                res.status(200).json({ message: "Task has been deleted"});
            } else {
                throw { name: "Task Not Found"};
            }
        } catch (err) {
            res.status(500).json(err);
        }

    }
}

module.exports = Controller;