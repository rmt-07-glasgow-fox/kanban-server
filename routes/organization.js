const router = require("express").Router();
const OrganizationController = require("../controllers/organization");
const { orgAuthorization } = require("../middlewares/auth");

router.post("/", OrganizationController.create);
router.get("/", OrganizationController.listAll);
router.put("/:id", orgAuthorization, OrganizationController.update);
// router.delete("/:id", orgAuthorization, OrganizationController.delete);

module.exports = router;
