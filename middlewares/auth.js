const { decode } = require("../helpers/jwt")
const { User,Task } = require('../models')
module.exports = {
    authentication: async (req,res,next)=>{
        try {
            let token = req.headers.access_token
            if (token){
                let user = decode(token)
                let result = await User.findOne({
                    where:{
                        email:user.email
                    }
                })
        
                if(result){
                    req.UserId = result.id
                    next()
                }else{
                    next({name: 'NotFound', message:'User not found'})
                }
            }else{
                next({name: 'Unauthorized', message:'Silahkan login dahulu'})
            }
        } catch (err) {
            next(err)
        }
    },
    authorization: async (req,res,next)=>{
        try {
            let id = req.params.id
            let UserId = req.UserId
    
            let result = await Task.findOne({
                where:{
                    id,
                    UserId
                }
            })
    
            if(result){
                next()
            }else{
                next({name: 'Forbidden', message:'You dont have access'})
            }
        } catch (err) {
            next(err)
        }
    }
}