require('dotenv').config()

// Next app
const next = require('next')
const express = require('express')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src' })


const keystone = require('keystone')

keystone.init({
  'name': 'Project',
  'brand': 'MyBrand',
  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'port': process.env.PORT || 3000,
  'mongo':  'mongodb://keystonejs_user:12345678a@cluster0-shard-00-00-l5uei.mongodb.net:27017,cluster0-shard-00-01-l5uei.mongodb.net:27017,cluster0-shard-00-02-l5uei.mongodb.net:27017/project?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  'mongo options': { server: { keepAlive: 1 }}
})

keystone.import('api/models')

app.prepare()
  .then(() => {
    const server = express()

    server.use(express.static(path.join(__dirname, 'src', 'public'), {
      extensions: ['html']
    }))

    keystone.set('locals', {
      classNames: require('classnames'),
      lodash: require('lodash')
    });

    keystone.set('routes', require('./api/routes')(app))

    keystone.set('nav', {
      posts: ['posts', 'post-categories'],
      users: 'users',
    });

    keystone.start()
  })
