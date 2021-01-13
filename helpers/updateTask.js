const timeFormat = require('../helpers/timeFormat');

module.exports = (model, object, id, res, next) => {
    model.update(object, {
        where: {
            id
        },
        returning: true,
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
                updatedAt: timeFormat(updatedAt)
            })
        })
        .catch(err => {
            next(err)
        })
}