const router = require("express").Router()
const user = require("./user")
const kanbanlist = require("./kanbanlist")
const {authentication} = require("../middlewares/auth")

router.use("/", user)
router.use("/", authentication, kanbanlist)

module.exports = router