const { Text, Url, Relationship, Integer } = require('@keystonejs/fields')
const { byTracking, atTracking } = require('@keystonejs/list-plugins');

const Post = {
  fields: {
    title: { type: Text },
    videoUrl: { type: Url },
    image: { type: Text },
    preview: { type: Text },
    categories: { type: Relationship, ref: 'Category', many: true },
    hd: { type: Integer },
    views: { type: Integer },
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
