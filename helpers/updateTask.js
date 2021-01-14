const timeFormat = require('../helpers/timeFormat');
const { Task, User } = require('../models')

module.exports = (object, id, res, next) => {
    let currentTask = ''
    Task.findOne({
        where: {
            id
        },
        include: {
            model: User
        }
    })
    .then(task => {
        currentTask = task;

        return Task.update(object, {
            where: {
                id
            },
            include: {
                model: User
            },
            returning: true,
        })
    })
    .then(response => {
        let succeed = response[0];
        let { id, description, category, userId, updatedAt } = response[1][0];

        if (!succeed) throw new Error('TaskNotFound')
        res.status(200).json({
            id,
            description,
            category,
            userId,
            updatedAt: timeFormat(updatedAt),
            name: currentTask.User.name
        })
    })
    .catch(err => {
        console.log(err);
        next(err)
    })
}