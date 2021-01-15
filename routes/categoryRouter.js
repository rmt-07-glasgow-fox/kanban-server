const express = require('express');
const categoryRouter = express.Router();
const CategoryController = require('../controllers/categoryController');
const { authentication, orgMemberAuthorization } = require('../middlewares/auth');

categoryRouter.use('/', authentication);
categoryRouter.use('/:orgId', orgMemberAuthorization);

categoryRouter.post('/:orgId', CategoryController.postCategory);
categoryRouter.get('/:orgId', CategoryController.getCategory);
categoryRouter.put('/:orgId/:catId', CategoryController.putCategory);
categoryRouter.delete('/:orgId/:catId', CategoryController.deleteCategory);

module.exports = categoryRouter;