const errorHandlers = ((err, req, res, next) => {
  if(err) {
    switch (err.name) {
      case "isEmail":
        res.status(400).json({ message: 'Invalid email format', error: err.message});
        break;
      case "len":
        res.status(400).json({ message: 'password at least 6 characters', error: err.message });
        break
      case "invalidEmailOrPassword":
        res.status(400).json({ message: "Invalid email / password", error: err.message });
        break
      case "title":
        res.status(400).json({ message: "title or is required" });
        break
      case "category":
          res.status(400).json({ message: "category or is required" });
        break
      case "notFound":
        res.status(404).json({ message: "Task Not Found" });
        break
      default:
        res.status(500).json({ message: "Internal Server Error", error: err.message });
        break;
    }
  }
})

module.exports = errorHandlers