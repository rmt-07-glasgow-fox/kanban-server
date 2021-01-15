function errorHandler(error, req, res, next){
    
     if(error.name === "InvalidLogin"){
        res.status(401).json({msg: "Invalid email / password"})
    }
    else if(error.name === "SequelizeValidateError"){
        res.status(400).json(error.errors[0].message)
    }
    else if(error.name === "SequelizeUniqueConstraintError"){
        res.status(409).json(error.errors[0].message)
    }
    else if(error.name === "UserNotFound"){
        res.status(404).json({msg: "User Not found"})
    }
    else if(error.name === "noAuthorized"){
        res.status(400).json({msg: 'you are not autorized to access this task'})
    }
    else if(error.name === "noAuthentication"){
        res.status(401).json({msg: 'Please Login First'})
    }
    else if(error.name === "idNotFound") {
        res.status(404).json({msg: "invalid id / id not found"})
    }
    else if(error.name === "TaskNotFound"){
        res.status(404).json({mgs: "Task not found in the database"})
    }
    else {
        res.status(500).json(error)
    }
}

module.exports = errorHandler