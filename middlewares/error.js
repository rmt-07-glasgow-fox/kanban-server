module.exports = (err, req, res, next) => {
    let message = err.message;

    if (err.name === 'SequelizeValidationError') {
        message = 'InvalidRequest'
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        message = "EmailExist";
    }

    if (err.name === 'JsonWebTokenError') {
        message = err.name
    }

    switch(message) {
        case 'InvalidRequest':
            res.status(400).json({message: 'Invalid request'});
            break;
        case 'InvalidUser':
            res.status(400).json({ message: 'Invalid user' });
        break;
        case 'JsonWebTokenError':
            res.status(400).json({message: 'Invalid User'})
        break
        case 'TaskAlreadyDeleted':
            res.status(400).json({message: 'Task already been deleted'})
        break;
        case 'ForbiddenAccess':
            res.status(400).json({message: 'Forbidden access'})
        case 'EmailExist':
            res.status(403).json({message: 'Email already in use' })
            break;
        case 'InvalidEmailPassword':
            res.status(404).json({message: 'Invalid email / password'})
            break;
        case 'TaskNotFound':
            res.status(404).json({ message: 'Task not found' })
        break;

        default: 
            res.status(500).json({ message: 'Internal server error'})
    }
}