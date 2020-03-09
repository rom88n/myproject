const keystone = require('keystone')

/**
 * PostCategory Model
 * ==================
 */

const PostType = new keystone.List('PostType', {})

PostType.add({
  title: { type: String, required: true, initial: true },
  href: { type: String, required: true, initial: true },
})

PostType.defaultColumns = 'title, href'

PostType.register()
