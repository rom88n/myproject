// Setup Route Bindings
// eslint-disable-next-line no-multi-assign
exports = module.exports = nextApp => keystoneApp => {
  // Next request handler
  const handle = nextApp.getRequestHandler()

  keystoneApp.get('*', (req, res) => {
    return handle(req, res)
  })
}
