// base
const express = require('express')

// ctrl
const Labels = require('../controllers/labels.ctrl')

const router = new express.Router()

router.route('/')
  .get(Labels.list)

module.exports = router
