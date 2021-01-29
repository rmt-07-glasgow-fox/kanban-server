const { Task, Category } = require('../models')

class TaskController {
  static addTask(req, res, next){
    Task.create({
      title: req.body.title || '',
      category: req.body.category || '',
      UserId: req.userData.id,
      CategoryId: req.body.CategoryId || ''
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getAllTasks(req, res, next){
    Task.findAll({
      where:{
        UserId: req.userData.id
      },
      include: [ Category ]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getTaskById(req, res, next){
    Task.findByPk(req.params.id, {
      include: [ Category ]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static updateTaskById(req, res, next){
    Task.update(req.body, {
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data[0] === 1){
          res.status(200).json({
            message: 'Success your task has been saved.'
          })
        }else{
          next({
            name: 'NoData'
          })
        }
      })
  }
  static patchTaskCategoryById(req, res, next){
    Task.update(
      {
        CategoryId: req.body.CategoryId
      },
      {
        where:{
          id: req.params.id
        }
      }
    )
    .then(_ => {
      res.status(200).json({
        message: 'Success your task has been saved.'
      })
    })
    .catch(err => {
      next(err)
    })
  }
  static deleteTaskById(req, res, next){
    Task.destroy({
      where:{
        id: req.params.id
      }
    })
      .then(data => {
        if(data === 1){
          res.status(200).json({
            message: 'Success your task has been deleted.'
          })
        }else{
          next({
            name: 'NoData'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TaskController