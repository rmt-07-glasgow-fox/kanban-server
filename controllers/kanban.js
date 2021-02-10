const {Kanban} = require('../models/index')
const {decodeToken} = require('../helper/jwt')

class KanbanCon{
    static add(req,res,next){
        let kanban = req.body
        kanban.UserId = decodeToken(req.headers.accesstoken).id
        Kanban.create(kanban)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static findAll(req,res,next){
        Kanban.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static findOne(req,res,next){
        let id = req.params.id
        Kanban.findOne({where:{id:id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static put(req,res,next){
        let id = req.params.id
        Kanban.update(req.body,{where:{id}})
        .then(data=>{
            if (data[0]==1) {
                return Kanban.findOne({where:{id:id}})
            } else {
                next({name: 'notFound'})
            }
        })
        .then(kanban=>{
            res.status(200).json(kanban)
        })
        .catch(err=>{
            next(err)
        })
    }

    static patch(req,res,next){
        let id = req.params.id
        let status = {
            status: req.body.status
        }

        Kanban.update(status,{where:{id}})
        .then(data=>{
            if (data[0]==1) {
                return Kanban.findOne({where:{id:id}})
            } else {
                next({name: 'notFound'})
            }
        })
        .then(kanban=>{
            res.status(200).json(kanban)
        })
        .catch(err=>{
            next(err)
        })
    }

    static destroy(req,res,next){
        let id = req.params.id
        let status = {
            status: req.body.status
        }

        Kanban.destroy({where:{id}})
        .then(data=>{
            console.log(data);
            if (data==1) {
                res.status(200).json({message:`${req.body.title} has been deleted`})
            } else {
                next({name: 'notFound'})
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}
module.exports = KanbanCon