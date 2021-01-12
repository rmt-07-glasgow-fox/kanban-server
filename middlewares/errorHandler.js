const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
            const validate = err.errors.map(el => {
                return el.message;
            })
            res.status(400).json({
                status: 'error',
                message: validate
            })
            break;
        case "SequelizeUniqueConstraintError":
            const unique = err.errors.map(el => {
                return el.message;
            })
            res.status(400).json({
                status: 'error',
                message: unique
            })
            break;
        case "authValidate":
            res.status(401).json({
                status: 'error',
                message: 'email or password wrong!'
            })
            break;
        case "notFound":
            res.status(404).json({
                status: 'error',
                message: 'not found!'
            })
            break;

        default:
            res.status(500).json({
                status: 'error',
                message: err.message
            })
            break;
    }
}