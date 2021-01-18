function errorHandlers(err, req, res, next) {
    if (err) {
        if (err.name === 'SequelizeValidationError') {
            res.status(401).json({message: err.message})
        } else if (err.name === 'requestNotFound') {
            res.status(404).json({message: "Not Found"})
        } else if (err.name === 'Email/Password Invalid') {
            res.status(400).json({message: 'Email/Password Invalid'})
        } else if (err.name === 'emailInvalid') {
            res.status(400).json({message: 'Please Login First'})
        } else if (err.name === 'accessDenied') {
            res.status(400).json({message: 'Access Denied'})
        } else {
            res.status(500).json({message: err.message})
        }
    }
}

module.exports = errorHandlers