const { User, Task } = require('../models');
const { verifyToken } = require('../helpers/jwt');

module.exports = {
    authenticate: (req, res, next) => {
        try {
            let { email } = verifyToken(req.headers.access_token);

            User.findOne({
                where: {
                    email,
                }
            })
                .then(user => {
                    if (!user) throw new Error ('InvalidUser');

                    req.user = {
                        userId: user.id,
                    }

                    next()
                })
                .catch(err => {
                    next(err)
                }) 
        } catch (err) {
            next(err)
        }
    },
    authorize: (req, res, next) => {
        try {
            let userId = req.user.userId;
            let categoryId = req.params.id;

            Task.findOne({
                where: {
                    id: categoryId
                }
            })
                .then(task => {
                    if (!task) throw new Error ('TaskNotFound')
                    if (userId != task.userId) throw new Error('ForbiddenAccess')

                    next()
                })
                .catch(err => {
                    next(err)
                })

        } catch (err) {
            next(err)
        }
    }
}