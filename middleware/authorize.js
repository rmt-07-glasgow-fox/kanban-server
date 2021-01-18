const {Task} = require("../models")

module.exports = async (req, res, next) => {
  try {
    const user = req.user
    const task = await Task.findByPk(req.params.id)
    if (user.id === task.UserId) {
      next()
    } else {
      throw {
        code: 403,
        message: `Unauthorized`
      }
    }
  } catch (error) {
    next(error)
  }
}