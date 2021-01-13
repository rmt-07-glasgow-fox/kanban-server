const { Task } = require('../models')

class ControllerTask {
  static showAll (req, res, next) {
    Task.findAll()
      .then(arrData => {
        res.status(200).json(arrData)
      })
      .catch(err => {
        next(err)
      })
  }

  static create (req, res, next) {
    const input = {
      title: req.body.title,
      category: req.body.category,
      UserId: req.user.id
    }

    Task.create(input)
      .then(data => {
        const output = {
          id: data.id,
          title: data.title,
          category: data.category,
          UserId: data.UserId
        }
        res.status(201).json(output)
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }

  static update (req, res, next) {
    const id = req.params.id
    console.log(req.user.id);
    const input = {
      title: req.body.title,
      category: req.body.category
    }
    Task.update(input, {
      where: { id },
      returning: true
    })
      .then(data => {
        console.log(data);
        if (data[0] > 0) {
          res.status(200).json(data[1])
        } else {
          next({
            name: 'Data not found'
          })
        }
      })
      .catch(err => {
        if (err.errors.length) {
          next(err)
        } else {
          next(err)
        }
      })
  }

  static changeCategory (req, res, next) {
    const id = req.params.id

    const input = {
      category: req.body.category
    }

    Task.update(input, {
      where: { id },
      returning: true
    })
      .then(data => {
        res.status(200).json(data[1])
      })
      .catch(err => {
        if (err.errors.length) {
          next(err)
        } else {
          next(err)
        }
      })
  }

  static delete (req, res, next) {
    const id = req.params.id

    Task.destroy({
      where: { id }
    })
      .then(response => {
        if (response) {
          res.status(200).json({
            message: 'Task success deleted successfully'
          })
        } else {
          next({
            name: 'Data not found'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ControllerTask
