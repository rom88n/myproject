const { Text } = require('@keystonejs/fields')
const { byTracking, atTracking } = require('@keystonejs/list-plugins');

const Category = {
  fields: {
    title: { type: Text },
    url: { type: Text },
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

module.exports = Category
