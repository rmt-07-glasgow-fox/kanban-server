const {User, Task} = require('../models')
const checkToken = require('../helper/checkToken')

async function authentication (req, res, next) {
    try{
        let decoded = checkToken(req.headers.access_token)
        let find = await User.findOne({where:{email:decoded.email}})
        if(!find){
            next({name:'Forbidden'})
        }else{
            req.user = find
            next()
        }
    }catch(err){
        next({name:'Forbidden'})
    }
}

function authorization (req, res, next){
    let id = req.params.id
    Task.findByPk(id)
    .then(data=>{
        if(!data){
            next({name:'NotFound'})   
        }else if (data.UserId !== req.user.id){
            next({name:'Unauthorized'})
        }else{
            next()
        }
    })  
    .catch (err=>{
        next(err)
    })    
}
module.exports = {authentication, authorization}