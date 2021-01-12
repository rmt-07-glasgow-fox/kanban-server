class IndexController {
  static home(req, res, next) {
    res.status(200).json({ message: "Welcome to Kanban"})
  }
}

module.exports = IndexController;