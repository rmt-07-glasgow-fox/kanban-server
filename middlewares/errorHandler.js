const errorHandlers = (err, req, res, next) => {
    if (err) {
        switch (err.name) {
            case "SequelizeValidationError":
                let errorMessage = err.errors.map(err => {
                    return {
                        message: err.message
                    }
                })
                console.log('masuk sini');
                res.status(400).json({errorMessage})
            break;

            default:
                res.status  (500).json({message: "Internal Server error"})
        }
    }
}

module.exports = {errorHandlers}