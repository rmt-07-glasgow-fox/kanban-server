const { Category } = require('../models')


class CategoryController {
    static async listCat (req, res, next) {
        try {
            const data = await Category.findAll({
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                }
            })

            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async addCat (req, res, next) {
        let newCat = {
            tag : req.body.tag
        }

        try {
            const data = await Category.create(newCat)

            res.status(201).json({
                msg : 'data successfull create',
                id : data.id,
                tag : data.tag
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteCat(req, res, next) {
        let id = +req.params.id

        try {
            const data = await Category.destroy({where :
                { id }
            })

            if(!data) {
                next({ name : 'notFound' })
            } else {
                res.status(200).json({
                    // id : data.id,
                    message : `Category ${id} success to delete`
                })
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = CategoryController