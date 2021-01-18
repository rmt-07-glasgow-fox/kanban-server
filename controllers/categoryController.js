const {Category, Task} = require("../models")

class Controller { 
  static async createCategory(req, res, next) {
    try {
      const data = {
        name: req.body.name
      }
      console.log(data);
      const category = await Category.create(data)
      res.status(201).json(category)
    } catch (error) {
      next(error)
    }
  }

  static async getCategories(req, res, next) {
    try {
      const categorys = await Category.findAll({order: ['id']})
      res.status(200).json(categorys)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async getCategory(req, res, next) {
    try {
      const id = req.params.id
      const category = await Category.findByPk(id)
      if (category) {
        res.status(200).json(category)
      } else {
        throw {
          code: 400,
          message: `The category does not exist`
        }
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const id = req.params.id
      const data = {
        name: req.body.name
      }
      const category = await Category.update(data, {where: {id}, returning: true})
      if (category) {
        res.status(200).json(category)
      } else {
        throw {
          code: 400,
          message: `The category does not exist`
        }
      }
    } catch (error) {
      
    }
  }

  static async patchCategory(req, res, next) {
    try {
      const id = req.params.id
      const category = await Category.findByPk(id)
      const data = {
        category: category.category
      }
      if (data) {
        switch (data.category) {
          case `Backlog`:
            data.category = `Todo`
            break;
          case `Todo`:
            data.category = `Doing`
            break;
          case `Doing`:
            data.category = `Done`
            break;
          case `Done`:
            data.category = `Completed`
            break;
          case `Completed`:
            data.category = `Backlog`
            break;
        }
        const pCategory = await Category.update(data, {where: {id}, returning: true})
        res.status(200).json(pCategory)
      } else {
        throw {
          code: 400,
          message: `The category does not exist`
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const id = req.params.id
      const category = await Category.findByPk(id)
      if (category) {
        const deletedCategory = await Category.destroy({where: {id}})
        const deletedTask = await Task.destroy({where: {CatId: category.id}})
        res.status(200).json({message: `category: '${category.title}' success to delete`})
      } else {
        throw {
          code: 400,
          message: `The category does not exist`
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller