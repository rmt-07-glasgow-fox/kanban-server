const { User, Category, Task } = require ('../models/index')

class CategoryController {
  static async getCategory (req, res, next) {
    try {
      let data = await Category.findAll ({
        attributes: ['id', 'name', 'color'],
        include: {
          model: Task
        },
        order: [
          ['id', 'ASC']
        ]
      })

      let userData = await User.findAll ({
        attributes: ['id', 'email'],
        include: {
          model: Task
        }
      })
      let finalData = data.map (category => {
        category.Tasks.forEach(tasks => {
          userData.forEach (user => {
            if (user.id === tasks.UserId) {
              tasks.dataValues.UserName = user.email
            }
          })
        })
        return category
      })
      res.status (200).json (finalData)
    } catch (err) {
      next (err)
    }
  }
}

module.exports = CategoryController