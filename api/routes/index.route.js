const express = require('express');

// routes
const labelsRoutes = require('./labels.route');
const postsRoutes = require('./posts.route');

const router = new express.Router();

// list
router.use('/posts', postsRoutes);
router.use('/labels', labelsRoutes);

module.exports = router;
