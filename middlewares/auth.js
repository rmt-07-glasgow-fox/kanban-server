const { cekToken } = require('../helper/jwt')
const { User,Todo } = require('../models')

function authenticate(req, res, next) {
    try {
        let decoded = cekToken(req.headers.access_token)
        console.log(decoded);
        User.findOne({
            where:{
                email:decoded.email
            }
        })
        .then(find => {
            if (!find) {
                res.status(401).json({ message:'login first' })
            } else{
                req.user = find
                next()
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

function authorize(req, res, next) {
    Todo.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(data => {
        if (!data || data.UserId != req.user.id) {
            next()
        } else {
            res.status(401).json({ msg: 'Not yours' })
        }
    })
    .catch(err => {
        res.status(500).json({ msg: err.msg })
    })
}

module.exports = { authenticate,authorize }
