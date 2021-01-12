const { checkToken } = require('../helpers/jwt');
const { User, Task } = require('../models');

async function authentication(req, res, next) {
    try {
        const decoded = checkToken(req.headers.access_token);
        const email = decoded.email
        const find = await User.findOne({
            where: {
                email
            }
        })
        if (find) {
            req.headers.user = {
                id: find.id,
                userName: find.userName,
                email: find.email
            };
            next()
        } else {
            throw { name: "Invalid Access Token"}
        }
    } catch (err) {
        res.status(403).json(err)        
    }
}

async function authorization(req, res, next) {
    try {
        const id = +req.params.id;
        console.log(req.params);
        const find = await Task.findOne({ where: { id } })
        if (find && find.UserId !== req.headers.user.id) {
            throw { name: "user Id not match"};
        } else {
            next();
        }
    } catch (err) {
        res.status(403).json(err);
    }
}

module.exports = {
    authentication,
    authorization
}