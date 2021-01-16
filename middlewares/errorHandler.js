function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      const validationErr = err.errors.map((e) => e.message);
      res.status(400).json({ message: validationErr });
      break;

    case "SequelizeUniqueConstraintError":
      const uniqueErr = err.errors.map((e) => e.message);
      res.status(400).json({ message: uniqueErr });
      break;

    case "LoginNotFound":
      res.status(400).json({ message: "Username / email not found" });
      break;

    case "WrongPassword":
      res.status(400).json({ message: "Wrong password" });
      break;

    case "NoToken":
      res.status(401).json({ message: "Access token needed" });
      break;

    case "InvalidToken":
      res.status(401).json({ message: "Invalid token" });
      break;

    case "Unauthorized":
      res.status(401).json({ message: "Unauthorized" });
      break;

    case "FailUpdate":
      res.status(400).json({ message: "No change was committed" });
      break;

    case "NotFound":
      res.status(404).json({ message: "There's nothing here" });
      break;

    default:
      res.status(500).json(err);
      break;
  }
}

module.exports = errorHandler;
