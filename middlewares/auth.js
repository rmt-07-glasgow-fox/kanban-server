const { checkToken } = require('../helpers/jwt')
const { User, Task } = require('../models')


async function authentication(req, res, next) {

    try {
        let decoded = checkToken(req.headers.access_token)
        // console.log(decoded)
        let data = await User.findOne({ 
            where: {
            email: decoded.email
        }})
            // console.log(data)
                if(!data) {
                    res.status(401).json({message: 'Please Login'})
                }
                else {
                    req.user = data
                }
                next()
    }
    catch(err) {
        console.log(err)
    }
}

function authorization(req, res, next) {

    Task.findOne({where: {
        id: req.params.id
    }})
        .then(data => {
            console.log(data)
            if(!data) {
                res.status(401).json({message: "Error Data Not Found"})
            } else if (data.UserId === req.user.id){
                next()
            } 
        })
        .catch(err => {
            next(err)
        })
    

}

module.exports = {
    authentication,
    authorization
}