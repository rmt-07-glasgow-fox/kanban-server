const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const categoryRoutes = require('./category');
const boardRoutes = require('./board');
const organizationRoutes = require('./organization');
const taskRoutes = require('./task');

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/boards', boardRoutes);
router.use('/organizations', organizationRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;
