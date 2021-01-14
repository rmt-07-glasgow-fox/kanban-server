function errorHandler (err, req, res, next) {
    if(err) {

        const {name} = err
        switch(name) {
            case 'SequelizeValidationError':
                let errorMessage = err.errors.map((err) => {
                    return { message: err.message}
                })
                res.status(400).json(errorMessage)
            case 'LoginValidation':
                return res.status(422).json([{message: 'Must provide email and password'}]);
            case 'RegisterValidation':
                return res.status(400).json([{message: 'Must provide email and password'}]);
            case 'LoginFailed':
                return res.status(400).json([{message: 'invalid email and password'}]);
            case 'NotFound' :
                return res.status(404).json([{message: `${err.attr} not found`}]);
            case 'Auth' :
                return res.status(401).json([{message: 'you must be logged in'}])
            case 'Authorize' :
                return res.status(401).json([{message: 'not authorize'}])
            default:
                res.status(500).json([{message: 'Internal server error', error: err}])
                break
        }
    }
}

module.exports = {errorHandler}