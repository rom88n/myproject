const keystone = require('keystone')

/**
 * PostCategory Model
 * ==================
 */

const PostCategory = new keystone.List('PostCategory', {})

PostCategory.add({
  title: { type: String, required: true, initial: true },
  ivi_id: { type: Number, initial: true },
  href: { type: String, required: true, initial: true },
})

PostCategory.defaultColumns = 'title, href'

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' })

PostCategory.register()
