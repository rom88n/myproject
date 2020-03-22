// base
const express = require('express')

// ctrl
const Post = require('../controllers/posts.ctrl')

const router = new express.Router()

router.route('/')
  .get(Post.list)

module.exports = router
