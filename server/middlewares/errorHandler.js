function errorHandler (err, req, res, next) {
    if (err) {
        switch(err.name) {
            case "SequelizeValidationError":
                const message = err.errors.map (el => {
                    return el.message
                })

                res.status (400).json ({ message })
            break
            
            case "SequelizeUniqueConstraintError":
                res.status(400).json ({ message: ["This Email Has Been Registered"] })
            break

            case "WrongInput":
                res.status(400).json ({ message: ["Invalid Email / Password"] })
            break

            case "NotLoggedIn":
                res.status(401).json ({ message: ["You Must Login First"] })
            break

            case "Unauthorized":
                res.status(401).json ({ message: ["You Have No Authorization to Make Changes"]})
            break
            
            case "ResourceNotFound":
                res.status (404).json ({ message: [ "Error Not Found" ] })
            break;

            default:
                res.status (500).json ({ message: ["Internal Server Error"] })
            break
        }
    }
}

module.exports = {
    errorHandler
}