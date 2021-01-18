const router = require("express").Router()
const organizationController = require("../controllers/organizationController")

router.post("/", organizationController.createOrganization)
router.get("/", organizationController.getOrganizations)
router.patch("/:id", organizationController.addUsertoOrg)

module.exports = router