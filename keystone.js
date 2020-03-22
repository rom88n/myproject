require('dotenv').config()

// Next app
const next = require('next')
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

const { createStaticRouter, createDynamicRouter } = require('keystone/admin/server')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src' })

const keystone = require('keystone')

const routes = require('./api/routes/index.route')

keystone.init({
  'name': 'Project',
  'brand': 'MyBrand',
  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'port': process.env.PORT || 3000,
  'mongo': 'mongodb://keystonejs_user:12345678a@cluster0-shard-00-00-l5uei.mongodb.net:27017,cluster0-shard-00-01-l5uei.mongodb.net:27017,cluster0-shard-00-02-l5uei.mongodb.net:27017/project?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  'mongo options': { server: { keepAlive: 1 } }
})

keystone.import('api/models')

app.prepare()
  .then(() => {
    const server = express()

    server.use(cors())
    server.use(cookieParser())

    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())

    server.use('/api', routes)

    server.use(flash())
    server.use(session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    }))

    server.use('/keystone', createStaticRouter(keystone))
    server.use('/keystone', createDynamicRouter(keystone))

    server.use(express.static(path.join(__dirname, 'src', 'public'), {
      extensions: ['html']
    }))

    server.listen(4000, err => {
      if (err) throw err
    })

    keystone.set('locals', {
      classNames: require('classnames'),
      lodash: require('lodash')
    })

    keystone.set('routes', require('./api/routes/index')())

    keystone.set('nav', {
      posts: ['posts'],
      users: 'users'
    })

    keystone.start()
  })
