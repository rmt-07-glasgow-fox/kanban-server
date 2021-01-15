const { Category, Task } = require('../models')

class CategoryController {
  static async showAll(req,res,next){
    try {
      const categories = await Category.findAll({
        order: [[`id`]],
        include: [Task]
      })
      res.status(200).json(categories)
    } catch (err) {
      next(err)
    }
  }

  static async create(req,res,next){
    try {
      const { name } = req.body
      const UserId = req.user.id
      const category = await Category.create({
        name: name || '',
        UserId
      })
      res.status(201).json(category)
    } catch (err) {
      next(err)
    }
  }

  static async showOne(req,res,next){
    try {
      const {id} = req.params
      const category = await Category.findOne({
        where: {id},
        include: [Task]
      })
      if(category) res.status(200).json(category)
      else next({name: 'ErrorNotFound'})
    } catch (err) {
      next(err)
    }
  }

  static async edit(req,res,next){
    try {
      const { id } = req.params
      const { name } = req.body
      const UserId = req.user.id
      const input = {
        name : name || '',
        UserId
      }
      const category = await Category.update(input, {
        where : {id},
        returning: true
      })
      if(category[0]){
        res.status(200).json(category[1][0])
      } else next({name: 'ErrorNotFound'})
    } catch (err) {
      next(err)
    }
  }

  static async delete(req,res,next){
    try {
      const { id } = req.params
      const category = await Category.destroy({
        where: {id}
      })
      if(category){
        res.status(200).json({
          message: 'category deleted successfull'
        })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CategoryController