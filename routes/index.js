const router = require("express").Router();
const IndexController = require("../controllers/index");
const UserController = require("../controllers/user");
const errorHandler = require("../middlewares/errorHandler");
const { authentication } = require("../middlewares/auth");
const taskRouter = require("./task");
const organizationRouter = require("./organization");

router.get("/", IndexController.home);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.use(authentication);
router.patch("/selectOrg", UserController.selectOrg);
router.use("/organizations", organizationRouter);
router.use("/tasks", taskRouter);
router.use(errorHandler);

module.exports = router;
