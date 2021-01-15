const { cekToken } = require("../helpers/jwt")
const { User, Task } = require("../models")


cekLogin = async (req, res, next) => {
    try {
        const token = req.headers.access_token
        const decoded = cekToken (token)
    
        let user = await User.findOne ({ where: { email: decoded.email }})
                
        if (user) {
            req.user = user
            next ()
        } else {
            next ({ name: "NotLoggedIn" })
        }
        
    } catch (err) {
        next(err)
    }
}

authorization = async (req, res, next) => {
    try {
        const id = +req.params.id
    
        let task = await Task.findOne({ where: { id }})
        
        if (task.UserId === req.user.id) {
            next()
        } else {
            next ({ name: "Unauthorized" })
        }
        
    } catch (err) {
        next (err)
    }
    
}

module.exports = {
    cekLogin,
    authorization
}