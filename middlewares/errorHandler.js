const errorHandler = (err,req,res,next) => {
  switch(err.name) {
    case "SequelizeValidationError":
      res.status(400).json(err.errors.map(err => {
        return {message: err.message}
      }))
      break;
    case "SequelizeDatabaseError":
      res.status(400).json({message: "Database error"})
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({message: "Constraint error"})
      break;
    case "Unauthorized":
      res.status(400).json({message: "Unauthorized action"})
      break;
    default:
      res.status(500).json({message: "Internal server error"})
  }
}

module.exports = errorHandler;