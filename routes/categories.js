const { route } = require("./task");

const router = require("express").Router();
const CategoryController = require("../controllers/category");

router.get("/", CategoryController.list);

module.exports = router;
