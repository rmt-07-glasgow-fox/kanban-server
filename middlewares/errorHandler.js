const errorHandler = (err, req, res, next) => {
    switch(err.name) {
        case 'SequelizeValidationError':
            res.status(400).json(
                err.errors.map(err => {
                    return { message: err.message }
            }));
            break;
        case 'SequelizeUniqueConstraintError':
            res.status(400).json({ message: 'Email has been already registered' });
            break;
        case 'SequelizeDatabaseError':
            res.status(400).json({ message: 'Please input date' });
            break;
        case 'PleaseLogin':
            res.status(400).json({ message: 'Please login first' });
            break;
        case 'Unauthorized':
            res.status(401).json({ message: `You're not authorized to access this item` });
            break;
        case 'NotFound':
            res.status(404).json({ message: 'Not Found' });
            break;
        case 'InvalidInput':
            res.status(400).json({ message: 'Wrong email or password' });
            break;
        default:
            res.status(500).json({ message: 'Internal server error' });
            break;
    }
}

module.exports = errorHandler;