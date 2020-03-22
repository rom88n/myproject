const { Text } = require('@keystonejs/fields')
const { byTracking, atTracking } = require('@keystonejs/list-plugins');

const Post = {
  fields: {
    name: { type: Text },
  },
  plugins: [
    byTracking({}),
    atTracking({}),
  ],
  access: {
    create: true,
    read: true,
    update: true,
    delete: true,
  },
}

module.exports = Post
