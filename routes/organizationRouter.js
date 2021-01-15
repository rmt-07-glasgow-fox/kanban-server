const express = require('express');
const organizationRouter = express.Router();
const { authentication, orgMemberAuthorization, orgAdminAuthorization } = require('../middlewares/auth');
const OrganizationController = require('../controllers/organizationController');
const MemberController = require('../controllers/memberController');
const UserController = require('../controllers/userController');

organizationRouter.use('/', authentication);

organizationRouter.post('/', OrganizationController.postOrg);
organizationRouter.get('/', OrganizationController.getOrg);

organizationRouter.use('/:orgId', orgMemberAuthorization);

organizationRouter.get('/:orgId', OrganizationController.getOrgById);
organizationRouter.use('/:orgId/users', UserController.getUser);
organizationRouter.get('/:orgId/members', MemberController.getMember);

organizationRouter.use('/:orgId', orgAdminAuthorization);

organizationRouter.post('/:orgId/members', MemberController.postMember);
organizationRouter.delete('/:orgId/members/:userId', MemberController.deleteMember);
organizationRouter.put('/:orgId', OrganizationController.putOrg);
organizationRouter.delete('/:orgId', OrganizationController.deleteOrg);
organizationRouter.patch('/:orgId', OrganizationController.patchOrg);


module.exports = organizationRouter;