function list(req, res, next) {
  try {
    return res.json({ data: '123' })
  } catch (e) {
    return next(e)
  }
}

module.exports = { list }
