const labelsList = require('../helpers/labels')

function list(req, res, next) {
  try {
    return res.json(labelsList)
  } catch (e) {
    return next(e)
  }
}

module.exports = { list }
