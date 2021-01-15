const { User, Task } = require('../models/')
const { verifyToken } = require('../helpers/jwt')


const authenticate = async (req, res, next) => {
    try {
        const decodedPayload = await verifyToken(req.headers.access_token)
        const foundUser = await User.findOne({
            where: {
                email: decodedPayload.email
            }
        })

        if (!foundUser) {
            res.status(401).json({ message: "Please register first!" })
        }
        else {
            req.user = {
                id: decodedPayload.id
            }
            next()
        }
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

const authorize = (req, res, next) => {

    const idTask = +req.params.id

    Task.findOne({
        where: {
            id: idTask
        }
    })
        .then(foundTask => {
            if (!foundTask) {
                next({ name: "ResourceNotFound" })
            }
            else if (foundTask.UserId !== req.user.id) {
                next({ name: "NoCredentials" })
            }
            else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = {
    authenticate, authorize
}
