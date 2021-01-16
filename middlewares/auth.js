const {User, Task, Category } = require('../models')
const {cekToken} = require('../helpers/jwt')

function authentication (req, res, next)  {
    try {
        let decoded = cekToken(req.headers.access_token)
        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then( data => {
            if (!data) {
                res.status(500).json({message: `please login first`})
            }
            else{
                req.user = data
                next()
            }
        })
        .catch( err => {
            res.status(500).json({message: err.message})

        })
    } catch (err) {
        res.status(400).json(err)
    }
}

function authorize(req, res, next) {
    Task.findOne({
        where: {
            id: +req.params.taskId
        }
    })
    .then( task => {
        if (task) {
            if (task.userId == req.user.id) {
                next()
            } else {
                res.status(401).json({ message: `unAuthorize`})
            }
        } else {
            res.status(404).json({ message: `not found`})
        }
    })
    .catch( err => {
        res.status(401).json({ message: err.message})
    })
}

module.exports = {
    authentication,
    authorize
}
