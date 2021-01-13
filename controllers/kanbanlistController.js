const {KanbanList} = require("../models")

class KanbanListController {
  static getLists(req, res, next) {
    KanbanList.findAll({where: {UserId: req.user.id}, attributes: {exclude: ['createdAt', 'updatedAt']}})
    .then(data => {
      if (data) {
        return res.status(200).json({data})
      } else {
        throw new Error({name: `Not Found`})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static add(req, res, next) {
    const addNew = {
      title: req.body.title,
      description: req.body.description,
      UserId: req.user.id
    }

    KanbanList.create(addNew)
    .then(data => {
      return res.status(201).json({id: data.id, title: data.title, description: data.description, category: data.category, UserId: data.UserId})
    })
    .catch(err => {
      next(err)
    })
  }

  static delete(req, res, next) {
    let id = +req.params.id
    
    if (id) {
      KanbanList.destroy({where: {id}})
      .then(data => {
        return res.status(200).json({message: `Deleted Successfully`})
      })
      .catch(err => {
        next(err)
      })
    } else {
      next({name: `Not Found`})
    }
  }

  static patch(req, res) {
    let id = +req.params.id

    const categoryUpdate = {
      category: req.body.category
    }

    if (id) {
      KanbanList.update(categoryUpdate, {where: {id}})
      .then(data => {
        return res.status(200).json({message: `Updated Successfully`})
      })
      .catch(err => {
        next(err)
      })
    } else {
      next({name: `Not Found`})
    }
  }

  static pickOne(req, res) {
    let id = +req.params.id

    if (id) {
      KanbanList.findByPk(id)
      .then(data => {
        return res.status(200).json({data})
      })
      .catch(err => {
        next(err)
      })
    } else {
      next({name: `Not Found`})
    }
  }
}

module.exports = KanbanListController