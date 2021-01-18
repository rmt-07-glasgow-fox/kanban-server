const { checkToken } = require('../helper/jwt')
const { User, Task } = require('../models')

const authenticate = async (req, res, next) => {
  try {
    let decoded = checkToken(req.headers.access_token)
    let find = await User.findOne({ where: { email: decoded.email}})
    if (!find) {
      return res.status(401).json({ message: 'Please Login First' })
    }
    req.user = find
    next()
  } catch (err) {
    return res.status(400).json({message: err.message})
  }
}

const authorize = async (req, res, next) => {
  try {
    let task = await Task.findOne({ where: {id: req.params.id}})
    if (!task) {
      return res.status(404).json({ message: 'This Task not found'})
    } else if (task.UserId !== req.user.id) {
      return res.status(401).json({ message: 'This Task not belongs to you'})
    }
    next()
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error"})
  }
}

module.exports = {
  authenticate,
  authorize
}