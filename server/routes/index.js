const router = require ("express").Router ()
const user = require ("./user")
const task = require ("./task")
const { cekLogin } = require("../middlewares/auth")


router.get ("/", (req, res) => {
    res.send({ message: "Welcome" })
})

router.use ("/users", user)
router.use (cekLogin)
router.use ("/tasks", task)



module.exports = router