const { Task, User, Category } = require ('../models/index')

class TaskController {
  static async getTask (req, res, next) {
    try {
      let data = await Task.findAll ({
        include: [
          {
            model: User,
            attributes: ['id', 'email']
          },
          {
            model: Category,
            attributes: ['id', 'name']
          }
        ],
        order: [
          ['updatedAt', 'ASC']
        ]
      })
      res.status (200).json (data)
    } catch (err) {
      next (err)
    }
  }

  static async postTask (req, res, next) {
    try {
      const { title, description, CategoryId } = req.body
      let data = await Task.create ({
        title,
        description,
        CategoryId,
        UserId: req.user
      })
      res.status (200).json (data)
    } catch (err) {
      next (err)
    }
  }

  static async putTask (req, res, next) {
    try {
      const obj = {
        title: req.body.title,
        description: req.body.description,
        CategoryId: req.body.CategoryId
      }
      let data = await Task.update (obj, {
        where: {
          id: +req.params.id
        },
        returning: true
      })
      let isSuccess = data[0]
      let dataObj = data[1]

      if (isSuccess === 1) {
        res.status(200).json (dataObj[0])
      } else {
        next ({name: 'Error not found'})
      }
    } catch (err) {
      next (err)
    }
  }

  static async patchTask (req, res, next) {
    try {
      const obj = {
        CategoryId: req.body.CategoryId
      }
      let data = await Task.update (obj, {
        where: {
          id: +req.params.id
        },
        returning: true
      })
      let isSuccess = data[0]
      let dataObj = data[1]

      if (isSuccess === 1) {
        res.status(200).json (dataObj[0])
      } else {
        next ({name: 'Error not found'})
      }
    } catch (err) {
      next (err)
    }
  }

  static async deleteTask (req, res, next) {
    try {
      let data = await Task.destroy ({
        where: {
          id: +req.params.id
        }
      })
      
      if (data === 1) {
        res.status (200).json ({message: 'todo success to delete'})
      } else {
        next ({name: 'Error not found'})
      }
    } catch (err) {
      next (err)
    }
  }
}

module.exports = TaskController