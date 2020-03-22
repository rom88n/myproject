const { Text } = require('@keystonejs/fields')

const Post = {
  fields: {
    name: { type: Text },
  },
  access: {
    create: true,
    read: true,
    update: true,
    delete: true,
  },
}

module.exports = Post
