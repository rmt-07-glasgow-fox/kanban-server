const { Task } = require('../models')

function authorize (req, res, next) {
  const id = req.params.id

  Task.findOne({
    where: { id }
  })
    .then(task => {
      if (!task) {
        res.status(404).json({
          message: 'Data not found'
        })
      } else if (task.UserId !== req.user.id) {
        res.status(401).json({
          message: 'Not authorized'
        })
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
}

module.exports = authorize
