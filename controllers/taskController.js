const {Task} = require("../models");

class TaskController {
  static getAll(req,res,next) {
    Task.findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }

  static getById(req,res,next) {
    Task.findByPk(Number(req.params.id))
      .then(data => {
        if(!data) throw new Error({name:"NotFound"})
        else res.status(200).json(data)
      })
      .catch(err => {
        err.name = "NotFound"
        next(err)
      })
  }
  
  static create(req,res,next) {
    const obj = {
      title: req.body.title,
      detail: req.body.detail,
      assign: req.body.assign,
      UserId: req.user.id
    }
    Task.create(obj)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
  }

  static update(req,res,next) {
    const id = Number(req.params.id)
    let obj = {
      title: req.body.title,
      detail: req.body.detail,
      assign: req.body.assign,
      category: req.body.category
    }
    Task.update(obj, {
      where: {
        id:id
      }
    })
      .then(() => {
        return Task.findByPk(id)
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static patch(req,res,next) {
    const id = Number(req.params.id)
    Task.update({category:req.body.category}, {
      where: {
        id:id
      }
    })
      .then(() => {
        return Task.findByPk(id)
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static delete(req,res) {
    Task.destroy({
      where: {
        id:Number(req.params.id)
      }
    }) 
      .then(data => {
        if(data == 1) res.status(200).json({message: "Task deleted successfully"})
        else res.status(404).json({message: "there is nothing to be deleted"})
      })
      .catch(err => {
        err.name="Unauthorized"
        next(err)
      })
  }
  static getAllBacklog(req,res,next) {
    Task.findAll({
      where: {
        category: "backlog"
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }
  static getAllTodo(req,res,next) {
    Task.findAll({
      where: {
        category: "todo"
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }
  static getAllDoing(req,res,next) {
    Task.findAll({
      where: {
        category: "doing"
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }
  static getAllDone(req,res,next) {
    Task.findAll({
      where: {
        category: "done"
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }
}

module.exports = TaskController