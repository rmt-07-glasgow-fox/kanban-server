let errHandler = (err, req, res, next) => {
  if (err) {
    switch (err.name) {
      case "SequelizeValidationError":
        res.status(400).json({ message: err.errors[0].message });
        break;
      case "invalidLogin":
        res.status(400).json({ message: "Your Email or Password is invalid" });
        break;
      case "SequelizeUniqueConstraintError":
        res.status(400).json({ message: err.errors[0].message });
        break;
      case "unauthorize":
        res.status(401).json({ message: 'You don\'t have permission to access this task' });
        break;
      case "notFound":
        res.status(404).json({ message: "Task not found" });
        break;
      default:
        res.status(500).json(err);
        break;
    };
  };
};

module.exports = errHandler;