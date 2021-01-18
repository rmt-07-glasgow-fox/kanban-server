const {Task, User} = require("../models")
const convertTime = require("../helpers/convertTime")
const {checkToken} = require("../helpers/jwt")

class taskController {
    static createTask(req, res, next) {
        let payload = checkToken(req.headers.access_token)
        const name = req.body.name
        const UserId = payload.id
        const status = 'backlog'
        const {email, organization} = payload
        Task.create({name, status, UserId, email, organization})
        .then(task => {
            const {name, status} = task
            return res.status(201).json({name, status})})
        .catch(err => {
            next(err)
        })
    }

    static showTasks(req, res, next) {
        const status = req.query.q
        Task.findAll({include: [User], where: {status}})
        .then(tasks => {
            const output = tasks.map(el => {
                return {
                    id: el.id,
                    name: el.name,
                    status: el.status,
                    email: el.User.email,
                    organization: el.organization,
                    update: convertTime(el.updatedAt)
                }
            })
            res.status(200).json(output)})
        .catch(err => next(err))
    }

    static showTask(req, res, next) {
        Task.findByPk(+req.params.id, {include: [User]})
        .then(task => {
            if (task) {
                const output = {
                        name: task.name,
                        status: task.status,
                        email: task.User.email,
                        organization: task.organization,
                        update: convertTime(task.updatedAt)
                    }
                res.status(200).json(output)
            } else {
                next({name: "requestNotFound"})
            }})
        .catch(err => next(err))
    }

    static updateTask(req, res) {
        const {name} = req.body
        Task.update({name}, {where: {id: +req.params.id}})
        .then(task => {
            res.status(200).json({message: "edit successfull"})})
        .catch(err => {
            next(err)
        })
    }

    static updateStatusTask (req, res) {
        const status = req.body.status
        Task.update({status}, {where: {id: +req.params.id}})
        .then(data => {
            res.status(200).json({message: "update status successfull"})})
        .catch(err => {
            next(err)
        })
    }

    static deleteTask(req, res) {
        Task.destroy({where: {id: +req.params.id}})
        .then(task => {
            if (task) {
                res.status(200).json({message: "Task success to delete"}) 
            } else {
                next({name: "requestNotFound"})
            }})
        .catch(err => next(err))
    }
}

module.exports = taskController