const router = require("express").Router()
const user = require("./user")
const task = require("./task")
const organization = require("./organization")
const {authentication} = require("../middlewares/auth")

router.use(user)
router.use(authentication)
router.use("/organization", organization)
router.use("/task", task)

module.exports = router