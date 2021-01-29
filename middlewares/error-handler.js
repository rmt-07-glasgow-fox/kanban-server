module.exports = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({message: err.message})
    } else if (err.name == 'SequelizeValidationError') {
        const errors = err.errors.map(err => err.message)
        res.status(400).json(errors)
    } else if (err.name == 'SequelizeUniqueConstraintError') {
        res.status(400).json({errors: `Email is Already Registered`})
    } else {
        res.status(500).json({message: `Internal Server Error`})
    }
}