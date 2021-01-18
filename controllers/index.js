module.exports = class Controller {
    static welcome(req, res, next) {
        res.status(200).json({ message: "Welcome" })
    }
}