const errorHandler = (err, req, res, next) => {

  switch (err.name) {
    case "SequelizeValidationError":
      let errorMessages = []
      err.errors.map(e => {
        errorMessages.push(e.message)
      }) 
      res.status(400).json(errorMessages)
      break;
    case "Unauthorize":
      res.status(401).json({message: `You don't have access`})
    break;
    case "UnauthorizeLogin":
      res.status(401).json({message: `Invalid Email / Password`})
    break;
    case "Not Found":
      res.status(404).json({message: `There's no such file`})
    break;
    default:
      res.status(500).json({message: `Internal Server Error`})
    break;
  }
}

module.exports = errorHandler