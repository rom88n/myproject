require('dotenv')
  .config()

const { Keystone } = require('@keystonejs/keystone')
const { PasswordAuthStrategy } = require('@keystonejs/auth-password')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const { NextApp } = require('@keystonejs/app-next')
const { GraphQLApp } = require('@keystonejs/app-graphql');
const initialiseData = require('./initial-data')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose')

const routes = require('./api/routes/index.route')

const PROJECT_NAME = 'app'

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter({
    mongoUri: 'mongodb://keystonejs_user:12345678a@cluster0-shard-00-00-l5uei.mongodb.net:27017,cluster0-shard-00-01-l5uei.mongodb.net:27017,cluster0-shard-00-02-l5uei.mongodb.net:27017/project?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
  }),
  onConnect: initialiseData
})

keystone.createList('User', require('./api/models/User'))
keystone.createList('Post', require('./api/models/Post'))
keystone.createList('Category', require('./api/models/Category'))

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User'
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      adminPath: '/admin',
      graphiqlPath: '/admin/graphiql',
      authStrategy
    }),
    new NextApp({ dir: './src' })
  ],
  configureExpress: app => {
    app.use(cors())
    app.use(cookieParser())

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.use('/api', routes)

    app.use(flash())
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    }))

    // app.listen(4000, err => {
    //   if (err) throw err
    // })
  }
}
