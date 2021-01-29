const { verifyToken } = require('../helper/jwt')
const { User, Task } = require('../models')


async function authenticate (req, res, next) {
    try {
        console.log('dari authenticate')
        const decode = verifyToken(req.headers.access_token)
        const data = await User.findOne({
            where: { id: decode.id}
        })
        if (!data) {
            res.status(400).json({
                msg: 'Please login'
            })
        } else { 
            req.user = data
            // console.log(req.user.id); // User.id yang login
            next()
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

async function authorized (req, res, next) {
    try {
        let id = +req.params.id
        const data = await Task.findByPk(id)
        // console.log(data);
        if (!data || data.UserId !== req.user.id) {
            res.status(401).json({
                msg: 'Your account not allowed to access'
            })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json(err)
        // console.log(err);
    }
}

module.exports = { authenticate, authorized }