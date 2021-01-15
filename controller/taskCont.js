const { Task } = require('../models')
const { verifyToken } = require('../helper/jwt')

class Controller {

  static async createTask (req, res, next) {
    try {
      let { title, category } = req.body
      let payload = await verifyToken(req.headers.access_token)
      let UserId = payload.id
      let task = await Task.create({ title, category, UserId })
      res.status(201).json({
        id: task.id,
        title: task.title,
        category: task.category,
        UserId: task.UserId
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  } 

  static getAll (req, res, next) {
    Task.findAll({order: [['id', 'asc']]})
    .then(tasks => {
      if (tasks) {
        res.status(200).json(tasks)
      } else {
        throw ({name: '404'})
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })   
  }

  /*
  static update (req, res, next) {
    let idParams = req.params.id
    let { title, category } = req.body
    Task.update({ title, category }, {where: {id: idParams}, returning: true})
    .then(task => {
      res.status(200).json(task[1])
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
  */

  static updateCategory (req, res, next) {
    let idParams = req.params.id
    let { category } = req.body
    Task.update({ category }, {where: {id: idParams}, returning: true})
    .then(task => {
      res.status(200).json(task[1])
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static delete (req, res, next) {
    let idParams = req.params.id
    Task.destroy({where: {id: idParams}})
    .then(() => {
      res.status(200).json({message: 'Task Deleted'})
    })
    .catch(err => {
      console.log(err)
      next(err)
    }) 
  }
}

module.exports = Controller;