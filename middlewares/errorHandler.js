function errorHandler(err, req, res, next) {
  if (err) {
    switch (err.name) {
      case "SequelizeValidationError":
        const errorMessages = err.errors.map((err) => {
          return err.message;
        });
        res.status(400).json({
          Error: "Validation Error",
          message: errorMessages.join(", "),
        });
        break;
      case "SequelizeUniqueConstraintError":
        res.status(400).json({
          Error: "Validation Error",
          message: "Email have been registered",
        });
        break;
      case "invalidEmailPassword":
        res.status(400).json({
          Error: "Validation Error",
          message: "Invalid Email or Password",
        });
        break;
      case "JsonWebTokenError":
        res.status(401).json({
          Error: "Unauthorized",
          message: "The requested page needs a valid username and a password",
        });
        break;
      case "dataNotFound":
        res
          .status(404)
          .json({ Error: "Invalid request", message: "Data not found" });
        break;
      case "forbidden":
        res.status(403).json({
          Error: "Forbidden access",
          message: "You are not authorized to access the file",
        });
        break;
      default:
        res.status(500).json({
          Error: "Error from Server",
          message: "Internal server error",
        });
        break;
    }
  }
}

module.exports = errorHandler;
