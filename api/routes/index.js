const keystone = require('keystone')

// Setup Route Bindings
// eslint-disable-next-line no-multi-assign
exports = module.exports = nextApp => keystoneApp => {
  // Next request handler
  const handle = nextApp.getRequestHandler()

  // TODO REFACTOR categories
  keystoneApp.post('/api/categories', async (req, res, next) => {
    try {
      const PostCategory = keystone.list('PostCategory').model
      const categories = await PostCategory.find().lean()
      res.json({
        type: [
          {
            title: 'Фильмы',
            href: 'films',
            _id: 'films'
          },
          {
            title: 'Сериалы',
            href: 'serials',
            _id: 'serials'
          }
        ],
        category: categories
      })
    } catch (e) {
      next(e)
    }
  })

  keystoneApp.get('/api/films', async (req, res, next) => {
    try {
      const { page = 1 } = req.query
      const query = { type: 'films' }
      const resPerPage = 15
      const Post = keystone.list('Post').model
      const [resources, total] = await Promise.all([
        Post.find(query, 'title year duration picture_url categories artists url')
          .where('status', 'published')
          .sort('-publishedDate')
          .skip((resPerPage * page) - resPerPage)
          .limit(resPerPage)
          .catch(e => next(e)),
        Post.count(query).catch(e => next(e)),
      ]);
      res.json({ resources, total })
    } catch (e) {
      next(e)
    }
  })

  keystoneApp.post('/api/recommended', async (req, res, next) => {
    try {
      const Post = keystone.list('Post').model
      const resources = await Post.find({}, 'title year picture_url type')
        .where('status', 'published')
        .sort('-publishedDate')
        .limit(5)
        .catch(e => next(e))
      res.json({ resources })
    } catch (e) {
      next(e)
    }
  })

  keystoneApp.get('/api/posts', async (req, res, next) => {
    try {
      const { type, category, years, text, inDesc, page = 1 } = req.query

      const query = {}
      if (type) query.type = type
      if (category) query.categories = category
      if (years) query.year = years
      if (text) {
        if (!inDesc) query.title = { '$regex': text, '$options': 'i' }
        if (inDesc && text) {
          query.$or = [
            {
              title: { '$regex': text, '$options': 'i' }
            },
            {
              description: { '$regex': text, '$options': 'i' }
            }
          ]
        }
      }


      const resPerPage = 15
      const Post = keystone.list('Post').model

      const [resources, total] = await Promise.all([
        Post.find(query, 'title year duration picture_url categories artists url type')
          .where('status', 'published')
          .sort('-publishedDate')
          .skip((resPerPage * page) - resPerPage)
          .limit(resPerPage)
          .catch(e => next(e)),
        Post.count(query).catch(e => next(e)),
      ]);
      res.json({ resources, total })
    } catch (e) {
      next(e)
    }
  })

  keystoneApp.post('/api/post', async (req, res, next) => {
    try {
      const { id } = req.body
      const Post = keystone.list('Post').model
      const film = await Post.find({ _id: id }).lean()

      let related = await Post.find({
        description: {
          '$regex': film[0].title, '$options': 'i'
        },
        _id: {
          $ne: film[0]._id
        }
      }, 'title year picture_url')
        .where('status', 'published')
        .sort('-publishedDate')
        .limit(3)
        .catch(e => next(e))

      // TODO Refactor related posts
      if (related.length < 3) {
        const count = await Post.count({})
        const skip = Math.floor(Math.random() * count)
        related = await Post.find({ }, 'title year picture_url')
          .where('status', 'published')
          .sort('-publishedDate')
          .skip(skip)
          .limit(3)
          .catch(e => next(e))
      }

      res.json({
        ...film[0],
        related
      })
    } catch (e) {
      next(e)
    }
  })

  keystoneApp.get('*', (req, res) => {
    return handle(req, res)
  })
}
