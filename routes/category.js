const router = require('express').Router()
const ControllerCategory = require("../controllers/category") 
const { authorize } = require('../middlewares/auth')

router.get("/", ControllerCategory.findAllCategory) 
router.post("/", ControllerCategory.insert) 
router.get("/:id",  ControllerCategory.findOne) 
router.put("/:id",  ControllerCategory.update) 
router.patch("/:id",  ControllerCategory.patch)
router.delete("/:id",  ControllerCategory.delete) 



module.exports = router