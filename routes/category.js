const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController.js");

router.get("/", CategoryController.getAllCategory);
router.post("/", CategoryController.postCategory);
router.get("/:id", CategoryController.getCategory);
router.put("/:id", CategoryController.putCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
