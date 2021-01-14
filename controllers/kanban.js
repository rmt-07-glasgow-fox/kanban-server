const { Task } = require('../models')

class KanbanController {
    static async add(req,res,next){
        try {
            let data = req.body
            data.UserId = req.UserId

            let result = await Task.create(data)
            if(result){
                delete result.updatedAt
                res.status(201).json(result)
            }
        } catch (error) {
            next(error)
        }
    }

    static async get(req,res,next){
        try {
            let result = await Task.findAll()
            if(result){
                res.status(200).json(result)
            }
        } catch (error) {
            next(error)
        }
    }

    static async getOne(req,res,next){
        try {
            let result = await Task.findOne({
                where:{
                    id: req.params.id
                }
            })
            if(result){
                res.status(200).json(result)
            }
        } catch (error) {
            next(error)
        }
    }

    static async edit(req,res,next){
        try {
            let data = req.body
            let id = req.params.id
            let result = await Task.update(data,{
                where:{
                    id
                },
                returning:true
            })
            if(result){
                res.status(200).json({result,message:'Berhasil diedit'})
            }
        } catch (error) {
            next(error)
        }
    }

    static async delete(req,res,next){
        try {
            let id = req.params.id
            let result = await Task.destroy({
                where:{
                    id
                }
            })
            if(result){
                res.status(200).json({message:'Berhasil dihapus'})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = KanbanController