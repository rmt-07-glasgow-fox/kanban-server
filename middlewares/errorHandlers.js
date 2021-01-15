const errorHandler = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case "SequelizeValidationError":
        let errorMessage = err.errors.map(err => {
          return {
            message: err.message
          }
        })
        return res.status(400).json(errorMessage)

      case "SequelizeUniqueConstraintError":
        return res.status(400).json({
          message: err.message
        })

      case "NotLoggedIn":
        return res.status(401).json({
          message: "Please login first!"
        })

      case "WrongLogin":
        return res.status(401).json({
          message: "Invalid email/password!"
        })

      case "Unauthorized":
        return res.status(401).json({
          message: "You're not authorized!"
        })

      case "CannotDelete":
        return res.status(403).json({
          message: "You cannot delete this!"
        })

      case "NotFound":
        return res.status(404).json({
          message: "Not found"
        })

      default:
        return res.status(500).json({
          message: "Internal Server Error"
        })
    }
  }
}

module.exports = errorHandler